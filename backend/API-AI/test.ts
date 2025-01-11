const { CohereClientV2 } = require('cohere-ai');

const cohere = new CohereClientV2({
  token: '55z3APpnyuA6cokVBDcwYJcQ2VTtlTWJwFAqfvDc',
});

(async () => {
  const response = await cohere.chat({
    model: 'command-r-plus',
    messages: [
      {
        role: 'user',
        content: 'hello world! can you ',
      },
    ],
  });

  console.log(response);
  console.log(response.messages.content)
})();
