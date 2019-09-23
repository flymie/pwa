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
  ctx.type = 'text/css; charset=utf-8';
};

module.exports = {
  'GET /hello/:name': fnHello,
};
