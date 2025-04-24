
---

# **Dot-Limiter**  

*DotLimiter is a light-weight flexible rate limiting library that supports in-memory, Redis, and MongoDB backends. It can be used seamlessly with Express, Koa, and Fastify.*

## **Installation** 

```bash

npm install dot-limiter


```

# **Storage**  

## **In-memory (For Testing)** 

```bash

import { InMemoryStore } from './stores/inmemory';
const store = new InMemoryStore();


```


## **Redis** 

```bash

import { RedisStore } from './stores/redis';
const store = new RedisStore('redis://localhost:6379');

```


## **MongoDB** 

```bash
import { MongoStore } from './stores/mongo';
const store = new MongoStore('mongodb://localhost:27017', 'ratelimiterdb', 'limits');


```


# **Usage Example**  

```bash
import { DotLimiter } from './limiters/dot';
const limiter = new DotLimiter('user-ip-or-id', 10, 60, store); // 10 requests per 60 seconds

```

# **Framework Integration**  

## **Express** 

```bash
import express from 'express';
import { expressMiddleware } from './middlewares/express';

const app = express();
app.use(expressMiddleware(limiter));

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

```

## **Fastify** 

```bash
import Fastify from 'fastify';
import { fastifyMiddleware } from './middlewares/fastify';

const app = Fastify();
app.addHook('onRequest', fastifyMiddleware(limiter));

app.get('/', async (request, reply) => {
  return 'Hello, world!';
});


```

## **Koa** 

```bash
import Koa from 'koa';
import { koaMiddleware } from './middlewares/koa';

const app = new Koa();
app.use(koaMiddleware(limiter));

app.use(ctx => {
  ctx.body = 'Hello, world!';
});


```


# **Testing Tips**  

Requests beyond the limit will receive a **429 Too Many Requests** status.

All stores reset the counter after the defined **windowInSeconds**.


# **You should know**  

Redis and Mongo provide better support for distributed systems.

In-memory should only be used in single-instance environments.

Store keys should be unique per user/requester (e.g., userId, IP address).

You can implement your own PersistenceStore to add support for other storage engines.



---

## ** Contributing**  
Contributions are welcome! Feel free to open issues or submit pull requests.  

