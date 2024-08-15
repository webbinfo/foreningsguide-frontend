# Introduktion
Frontenden är byggd med Next.js och Typescript. Next.js är React-baserat. För att köra frontendprojektet lokalt så behöver du ha Node.js installerat. Om du inte har det så kan du ladda ner det [här](https://nodejs.org/en/). 

# Installation
När du har installerat Node.js så kan du installera projektet genom att köra följande kommando i terminalen:

```npm install```

När projektet är installerat så kan du starta frontendprojektet genom att köra följande kommando:

Utvecklarläge:
```npm run dev```

Produktionsläge:
```npm run build && npm run start```

# Konfiguration
För att konfigurera frontendprojektet så behöver du skapa en .env-fil i frontend-mappen. Du kan modifera .env.example och döpa om den till .env. I .env-filen så kan du konfigurera porten som frontendprojektet ska lyssna på och andra inställningar. Som standard så kommer .env-filer inte att pushas till GitHub av säkerhets skäl. I filen behöver du peka till backenden genom att sätta en variabel med namnet NEXT_PUBLIC_API_URL, exempelvis:

```NEXT_PUBLIC_API_URL=http://localhost:1337``` för din loaka utvecklingsmiljö 
eller
```NEXT_PUBLIC_API_URL=https://cms.foreningsguide.studentlivet.se``` för produktion

# Dokumentation
För att läsa mer om Next.js och hur du kan använda det så kan du besöka [Next.js dokumentation](https://nextjs.org/docs). Dokumentationen är väldigt utförlig och innehåller allt du behöver veta för att komma igång med Next.js.

För utförligare dokumentation samt instruktioner för utveckling, se [GitHub-wikin](https://github.com/karservice/foreningsguide/wiki).