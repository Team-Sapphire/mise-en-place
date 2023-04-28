<div style="display: flex; justify-content:center; width:100%;">
  <div style="display:flex; justify-content: center; flex-basis:80%;">
      <img src="./public/logo-chef-hat.svg" style="width:3em; height:3em;" alt="chef hat"/>
  </div>
  <div>
      <img src="./public/logo-mise-en-place.svg" style="width:10em;" alt="logo"/>
  </div>
</div>

## Tech Stack

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Axios](https://img.shields.io/badge/-Axios-671ddf?logo=axios&logoColor=black&style=for-the-badge)

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href='#overview'>Overview
      <ul>
        <li><a href='#recipe-recommendation'>Recipe Recommendation</a></li>
        <li><a href='#openai-integration'>OpenAI Integration</a></li>
        <li><a href='#user-preferences'>User Preferences</a></li>
        <li><a href='#landing-page'>Landing Page</a></li>
        <li><a href='#cart-integration-via-kroger'>Cart Integration Via Kroger</a></li>
        <li><a href='#database-via-neon'>Database via Neon</a></li>
        <li><a href='#recipe-page'>Recipe Page</a></li>
        <li><a href='#main-page'>Main Page</a></li>
      </ul>
    </li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

#### Overview

## A Comprehensive Culinary Solution for Modern Living

In today's fast-paced world, many individuals find the prospect of cooking at home to be a daunting and time-consuming endeavor. Recognizing this challenge, we have developed Mise en Place, an innovative application designed to transform reluctant home cooks into passionate culinary enthusiasts.

As modern lifestyles demand efficiency and convenience, individuals with busy careers, demanding schedules, and minimal cooking experience often seek cost-effective alternatives to dining out. Mise en Place is poised to revolutionize the home cooking experience, empowering users of diverse backgrounds to unleash their inner Master Chef.

Our comprehensive platform offers a user-friendly solution for tracking meal ingredients, recipes, and meal planning, streamlining the culinary process and promoting a seamless cooking experience. Furthermore, Mise en Place fosters a sense of community by connecting individuals through their shared passion for food, making the culinary journey more engaging and enjoyable for all.

## Recipe recommendation

<p align="right">(<a href="#top">back to top</a>)</p>

## OpenAI Integration with Recipe Creation

<p align="right">(<a href="#top">back to top</a>)</p>

## User Preferences

<p align="right">(<a href="#top">back to top</a>)</p>

## Landing Page

<p align="right">(<a href="#top">back to top</a>)</p>

## Cart integration via Kroger

<p align="right">(<a href="#top">back to top</a>)</p>

## Database via Neon

<p align="right">(<a href="#top">back to top</a>)</p>

## Recipe Page

<p align="right">(<a href="#top">back to top</a>)</p>

## Main Page

<p align="right">(<a href="#top">back to top</a>)</p>

## Installation

<ol>
  <li>
    <h3>Prerequisites</h3>
    <p>
      This repository uses:
      <ul>
        <li>Auth0</li>
        <li>Edamam API</li>
        <li>OpenAI</li>
        <li>Postgres database</li>
      </ul>
        <p>The rest of the installation will assume you have these registered and ready to go.</p>
        <p>It will also assume you have a <a href='https://www.howtogeek.com/27350/beginner-geek-how-to-edit-your-hosts-file/'>hosts</a> file with the following line:</p>
        <code>127.0.0.1 dev.local</code>
        <p>This is needed to enable SSL.</p>
        <p>It will also assume you have a keysAndCerts folder in your root with an SSL certificate named: "localhost.crt" and an SSL key named: "localhost.key" and these should be for the domain dev.local.
        <a href="https://gist.github.com/cecilemuller/9492b848eb8fe46d462abeb26656c4f8">How To</a></p>
    </p>
  </li>
  <li>
    <h3>Clone the repository.</h3>
  </li>
  <li>
    <h3>Duplicate the env.local.copy and rename it to env.local.</h3>
  </li>
  <li>
    <h3>Add values to the env.local:</h3>

    AUTH0_SECRET=use [openssl rand -hex 32] to generate a 32 bytes value
    AUTH0_BASE_URL=This is your Auth0 Callback URL (starting with https://)
    AUTH0_ISSUER_BASE_URL=Your Auth0 Domain (starting with https://)
    AUTH0_CLIENT_ID=Your Auth0 ClientID
    AUTH0_CLIENT_SECRET= Your Auth0 Client Secret
    DATABASE_URL=URL of Postgres database
    EDAMAM_APP_ID=Edamam API ID
    EDAMAM_API_KEY=Edamam API Key
    OPENAI_API_KEY=OpenAI API Key

  </li>
  <li>
    <h3>Start the server with:</h3>

    npm run dev

  </li>
  <li><h3>Optionally, deploy to <a href="https://vercel.com">Vercel</a>, easily!</h3></li>
</ol>

<p align="right">(<a href="#top">back to top</a>)</p>

## Usage

The primary goal of this repository was to provide an educational platform for our team of developers to practice building a React application utilizing a microservice architecture. The project involved collaborative work between five other engineers to ensure a robust and well-designed application. By working on this project, we gained valuable experience in developing and deploying microservices in a real-world application using git workflow.

<p align="right">(<a href="#top">back to top</a>)</p>

## Contact

[Natale Toscano](https://www.linkedin.com/in/nataletoscano/)

<p>
 <a href="https://www.linkedin.com/in/nataletoscano/">
 <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white">
 </a>
 <a href="https://github.com/Vorelli">
 <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white">
 </a>
</p>

<p align="right">(<a href="#top">back to top</a>)</p>
