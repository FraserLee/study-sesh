# READ THIS FIRST

Heya Jeff, Will, Saad, Alexandre, Peter - Fraser here. Once you have your
environment setup how we described (either a unix system or WSL with npm
installed), your next steps are:

```bash
git clone https://github.com/FraserLee/study-sesh/

cd study-sesh

mv .env-example .env

npm install

npx prisma db push

npm run dev
```

You'll see a url (like `http://localhost:3000`) printed out. Copy that into
your browser. This local version of the website will refresh live as you change
the code.

Once you've got that working, check out [init.tips](https://init.tips) for more
information about how to use this tech-stack. There's a community for it at
[https://t3.gg/discord] so probably join that. Documentation for specific
pieces can be found at:
- [Next-Auth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [TailwindCSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

Also checkout these tutorials on the stack to get a bit more familliar:
- [Build a Blog With the T3 Stack - tRPC, TypeScript, Next.js, Prisma & Zod](https://www.youtube.com/watch?v=syEWlxVFUrY)
- [Build a Live Chat Application with the T3 Stack - TypeScript, Tailwind, tRPC](https://www.youtube.com/watch?v=dXRRY37MPuk)
- [Build a full stack app with create-t3-app](https://www.nexxel.dev/blog/ct3a-guestbook)
- [A first look at create-t3-app](https://dev.to/ajcwebdev/a-first-look-at-create-t3-app-1i8f)




---

```bash
npx prisma studio # to manually mess with the database
```
