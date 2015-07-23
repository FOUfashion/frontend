import KoaRouter from 'koa-router';

const router = new KoaRouter({ prefix: '/counter' });
let count = 0;

router.get('/', function *() {
  this.body = count;
});

router.post('/increment', function *() {
  this.body = ++count;
});

router.post('/decrement', function *() {
  this.body = --count;
});

export default router;
