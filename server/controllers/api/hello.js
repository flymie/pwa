const fnHello = async (ctx, next) => {
  const { name } = ctx.params;
  // ctx.response.body = `<h1>Hello, ${name}!</h1>`;
  const data = {
    name: 'jk',
    age: 25,
  };
  ctx.body = {
    status: true,
    data,
  };
};

module.exports = {
  'GET /hello/:name': fnHello,
};
