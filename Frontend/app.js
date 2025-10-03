(function () {
  const endpointEl = document.getElementById('endpoint');
  const queryEl = document.getElementById('query');
  const variablesEl = document.getElementById('variables');
  const outputEl = document.getElementById('output');
  const runQueryBtn = document.getElementById('runQuery');
  const runMutationBtn = document.getElementById('runMutation');

  async function sendGraphQL({ endpoint, query, variables }) {
    outputEl.textContent = 'Loading...';
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ query, variables }),
      });

      const text = await res.text();
      let json;
      try {
        json = JSON.parse(text);
      } catch (e) {
        json = { error: 'Non-JSON response', status: res.status, body: text };
      }
      outputEl.textContent = JSON.stringify(json, null, 2);
    } catch (err) {
      outputEl.textContent = JSON.stringify({ error: String(err) }, null, 2);
    }
  }

  function parseVariables(text) {
    if (!text.trim()) return undefined;
    try {
      return JSON.parse(text);
    } catch (e) {
      throw new Error('Variables must be valid JSON');
    }
  }

  function run(kind) {
    const endpoint = endpointEl.value.trim();
    const query = queryEl.value;
    let variables = undefined;
    try {
      variables = parseVariables(variablesEl.value);
    } catch (e) {
      outputEl.textContent = JSON.stringify({ error: e.message }, null, 2);
      return;
    }

  
    sendGraphQL({ endpoint, query, variables });
  }

  runQueryBtn.addEventListener('click', () => run('query'));
  runMutationBtn.addEventListener('click', () => run('mutation'));
})();
