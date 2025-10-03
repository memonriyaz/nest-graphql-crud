import React, { useMemo, useState } from 'react'
import { useQuery, useMutation, useLazyQuery } from '@apollo/client'
import { GET_ALL_USERS, CREATE_USER, UPDATE_USER, REMOVE_USER, GET_USER } from './graphql'

interface Props {
  defaultEndpoint: string
}

export default function App({ defaultEndpoint }: Props) {
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS)

  const [createUser, { loading: creating }] = useMutation(CREATE_USER, {
    onCompleted: () => {
      setForm({ name: '', email: '', userRole: 'User' })
      refetch()
    },
  })

  const [updateUser, { loading: updating }] = useMutation(UPDATE_USER, {
    onCompleted: () => refetch(),
  })

  const [removeUser, { loading: removing }] = useMutation(REMOVE_USER, {
    onCompleted: () => refetch(),
  })

  const [loadUser, { data: userData, loading: loadingUser, error: userError }] = useLazyQuery(GET_USER, { fetchPolicy: 'no-cache' })

  const [form, setForm] = useState({ name: '', email: '', userRole: 'User' })
  const [idInput, setIdInput] = useState('')

  const users = useMemo(() => (data?.getAllUsers ?? []) as Array<{ _id: string; name: string; email: string; userRole: string }>, [data])

  async function onCreate(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim()) return
    await createUser({ variables: { input: form } })
  }

  async function onInlineUpdate(user: { _id: string; name: string; email: string; userRole: string }) {
    await updateUser({ variables: { input: { _id: user._id, name: user.name, email: user.email, userRole: user.userRole } } })
  }

  async function onDelete(id: string) {
    await removeUser({ variables: { id } })
  }

  return (
    <div>
      <h1>Users</h1>

      <section>
        <h2>Create User</h2>
        <form onSubmit={onCreate} className="row" style={{ alignItems: 'flex-end' }}>
          <div className="field">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Jane Doe"
            />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              placeholder="jane@example.com"
            />
          </div>
          <div className="field">
            <label htmlFor="role">Role</label>
            <input
              id="role"
              type="text"
              value={form.userRole}
              onChange={(e) => setForm((f) => ({ ...f, userRole: e.target.value }))}
              placeholder="User"
            />
          </div>
          <div className="field" style={{ maxWidth: 200 }}>
            <button type="submit" disabled={creating || !form.name || !form.email}>Create</button>
          </div>
        </form>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>Get User by ID</h2>
        <form onSubmit={(e) => { e.preventDefault(); if (idInput.trim()) loadUser({ variables: { id: idInput.trim() } }) }} className="row" style={{ alignItems: 'flex-end' }}>
          <div className="field">
            <label htmlFor="userId">User ID</label>
            <input id="userId" type="text" value={idInput} onChange={(e) => setIdInput(e.target.value)} placeholder="Paste _id here" />
          </div>
          <div className="field" style={{ maxWidth: 200 }}>
            <button type="submit" disabled={!idInput.trim() || loadingUser}>Fetch User</button>
          </div>
        </form>
        {userError && <p style={{ color: 'crimson' }}>Error: {userError.message}</p>}
        {loadingUser && <p>Loading user...</p>}
        {userData?.getUser && (
          <div className="field">
            <label>Result</label>
            <pre>{JSON.stringify(userData.getUser, null, 2)}</pre>
          </div>
        )}
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>All Users</h2>
        {loading && <p>Loading users...</p>}
        {error && <p style={{ color: 'crimson' }}>Error: {error.message}</p>}
        {!loading && !error && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', borderBottom: '1px solid #8884', padding: '8px' }}>ID</th>
                  <th style={{ textAlign: 'left', borderBottom: '1px solid #8884', padding: '8px' }}>Name</th>
                  <th style={{ textAlign: 'left', borderBottom: '1px solid #8884', padding: '8px' }}>Email</th>
                  <th style={{ textAlign: 'left', borderBottom: '1px solid #8884', padding: '8px' }}>Role</th>
                  <th style={{ textAlign: 'left', borderBottom: '1px solid #8884', padding: '8px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <InlineEditableRow key={u._id} user={u} onSave={onInlineUpdate} onDelete={onDelete} saving={updating || removing} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

    </div>
  )
}

function InlineEditableRow({ user, onSave, onDelete, saving }: { user: { _id: string; name: string; email: string; userRole: string }; onSave: (u: any) => void; onDelete: (id: string) => void; saving: boolean }) {
  const [local, setLocal] = useState(user)
  const changed = local.name !== user.name || local.email !== user.email || local.userRole !== user.userRole

  return (
    <tr>
      <td style={{ borderBottom: '1px solid #eee', padding: '8px', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace', fontSize: 12 }}>
        <code>{user._id}</code>
      </td>
      <td style={{ borderBottom: '1px solid #eee', padding: '8px' }}>
        <input type="text" value={local.name} onChange={(e) => setLocal((v) => ({ ...v, name: e.target.value }))} />
      </td>
      <td style={{ borderBottom: '1px solid #eee', padding: '8px' }}>
        <input type="text" value={local.email} onChange={(e) => setLocal((v) => ({ ...v, email: e.target.value }))} />
      </td>
      <td style={{ borderBottom: '1px solid #eee', padding: '8px' }}>
        <input type="text" value={local.userRole} onChange={(e) => setLocal((v) => ({ ...v, userRole: e.target.value }))} />
      </td>
      <td style={{ borderBottom: '1px solid #eee', padding: '8px', display: 'flex', gap: 8 }}>
        <button disabled={!changed || saving} onClick={() => onSave(local)}>Save</button>
        <button disabled={saving} style={{ color: 'white', background: 'crimson', borderColor: 'crimson' }} onClick={() => onDelete(user._id)}>Delete</button>
      </td>
    </tr>
  )
}
