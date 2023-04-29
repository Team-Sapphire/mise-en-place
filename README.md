<div style="display: flex; justify-content:center; width:100%;">
  <div style="display:flex; justify-content: center; flex-basis:80%;">
      <img src="./public/logo-chef-hat.svg" style="width:3em; height:3em;" alt="chef hat"/>
  </div>
  <div>
      <img src="./public/logo-mise-en-place.svg" style="width:10em;" alt="logo"/>
  </div>
</div>

## Tech Stack

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/database-postgresql-f6c819?style=for-the-badge&logo=postgresql&logoColor=white&labelColor=21223e)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Axios](https://img.shields.io/badge/-Axios-671ddf?logo=axios&logoColor=black&style=for-the-badge)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href='#a-comprehensive-culinary-solution-for-modern-living'>Overview
      <ul>
        <li><a href='#openai-integration'>OpenAI Integration</a></li>
        <li><a href='#cart-integration-via-kroger'>Cart Integration Via Kroger</a></li>
        <li><a href='#user-preferences'>User Preferences</a></li>
        <li><a href='#recipe-recommendation'>Recipe Recommendation</a></li>
        <li><a href='#database-via-neon'>Database via Neon</a></li>
        <li><a href='#landing-page'>Landing Page</a></li>
        <li><a href='#recipe-page'>Recipe Page</a></li>
        <li><a href='#main-page'>Main Page</a></li>
      </ul>
    </li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## A Comprehensive Culinary Solution for Modern Living

In today's fast-paced world, many individuals find the prospect of cooking at home to be a daunting and time-consuming endeavor. Recognizing this challenge, we have developed Mise en Place, an innovative application designed to transform reluctant home cooks into passionate culinary enthusiasts.

As modern lifestyles demand efficiency and convenience, individuals with busy careers, demanding schedules, and minimal cooking experience often seek cost-effective alternatives to dining out. Mise en Place is poised to revolutionize the home cooking experience, empowering users of diverse backgrounds to unleash their inner Master Chef.

Our comprehensive platform offers a user-friendly solution for tracking meal ingredients, recipes, and meal planning, streamlining the culinary process and promoting a seamless cooking experience. Furthermore, Mise en Place fosters a sense of community by connecting individuals through their shared passion for food, making the culinary journey more engaging and enjoyable for all.

## OpenAI Integration for Recipe Creation

In order to provide comprehensive and customized cooking instructions to users for a wide range of recipes, we leveraged OpenAI since the Edamam API did not include instructions for their recipes. By submitting a prompt consisting of the recipe name and ingredients, we were able to generate personalized recipe instructions using the power of the OpenAI platform.

<p align="right">(<a href="#top">back to top</a>)</p>

## Cart Integration via Kroger

On the cart page, users can send their currently selected recipe's ingredients to Kroger.

- Users can log in with their Kroger account to gain access to the cart's functionality.
- Utilizes Kroger's API to get the Kroger equivalent products using their UPC.
- Upon clicking the Send to Kroger button, the products listed are added to the user's Kroger cart.

<img src='https://i.imgur.com/Lg9Es1V.gif'>

<p align="right">(<a href="#top">back to top</a>)</p>

## User Preferences

Once users are logged in, they are able to add custom data to their account describing their dietary and health preferences, as well as the number of people and meals to determine how many meals and servings the app should provide. This data, unique to each user, is then compiled and sent directly to the Edamam API, which then sends back recipes matching that user's preferences and specifications. Any subsequent changes by the user to the preferences, exclusions, or quantities will be updated in the database, and recipe recommendations for that user will change accordingly.
ns.

<p align="right">(<a href="#top">back to top</a>)</p>

## Database via Neon

Recipe and user data is stored on Neon's serverless PostgreSQL platform, and queries are handled with the <pre>node-postgres</pre> package. The schema is outlined below:
<img src="https://i.imgur.com/Wz8Pz7j.png">

Writes to the database occur at several key points throughout the application, primarily when:

- Creating a new user account (_users_)
- Updating user preferences (which kicks off the Edamam query) (_users, recipes, userrecipes_)
- Editing instructions (_recipes, userrecipes_)

<p align="right">(<a href="#top">back to top</a>)</p>

## Landing Page

<img src="https://i.imgur.com/R0HPxW9.png">

The landing page invites the user to explore and investigate Mise En Place.

Key elements:

- Main Image Carousel: The main image carousel showcases a variety of enticing food images to engage users and highlight the app's features.
- User Testimonial: A section with a real user's testimonial accompanied by their picture is displayed, showcasing the app's positive impact on users' lives.
- About The App - This section briefly explains the purpose of Mise en Place, with a brief description, image, and navigation buttons to explore the app further.
- Connect with Kroger - A button which encourages users to connect with their Kroger account for a seamless, automatic shopping experience.

Interactivity:

- The main image carousel as well as the user testimonial section can be clicked on to cycle through each others' images/cards.
- The About The App Section is an interactive section that prioritizes teaching the user what the app can do and how.
- The Connect With Kroger/Log In buttons can be clicked on to go through the Auth0 portal to authenticate through Kroger so ingredients can be saved to the user's Kroger cart.

<p align="right">(<a href="#top">back to top</a>)</p>

## Recipe Page

<img src='https://i.imgur.com/XRIswNn.png'/>

When a recipe is clicked on the main page, the recipe page is displayed that provides in-depth information on the selected recipe.

Information provided by the Edamam API with adjustments:

- Ingredients quantities that are adjusted to match the number of servings selected by the user.
- Nutritional values calculated per serving
- Health Labels that pertain to the recipe such as the cuisine type and dietary limitations
  Instructions generated by OpenAI:
- This provides personalized cooking instructions based on the ingredients and recipe name.
- The "Customize" button allows the user to edit the instructions and ingredients based on personal preference.
  The "Buy the Ingredients" button takes the user to the Kroger cart implementation page.

<p align="right">(<a href="#top">back to top</a>)</p>

## Main Page

The Main Page is the first the the user sees after logging in to select recipes

Dynamic information based off the particular user from Edamam API

- Future Recipes: Displays current recipes based off what the user inserted into the preferences. If preferences are not selected, displays a set 20 recipes.

- Todays Recipe: Dynamically renders the selected recipe at the top of the page. after clicking the "Lets Make It" button, sends the selected recipe to the recipe page.

- Recipe Modal: When clicking the question mark button on a recipe, a pop up modal comes up with an image and ingredients ordered list. A quick detail page of a recipe.

- Redirect Buttons: Quick access buttons that reroute the user to the cart or the user preferences.

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
        <li>Kroger API </li>
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
    KROGER_ID=Kroger Products API Client ID
    KROGER_SECRET=Kroger Products API Client Secret

  </li>
  <li>
    <h3>Start the server with:</h3>

    npm run dev

  </li>
  <li><h3>Optionally, easily deploy to <a href="https://vercel.com">Vercel</a>!</h3></li>
</ol>

<p align="right">(<a href="#top">back to top</a>)</p>

## Usage

The primary goal of this repository was to provide an educational platform for our team of developers to practice building a React application utilizing a microservice architecture. The project involved collaborative work between six engineers to ensure a robust and well-designed application. By working on this project, we gained valuable experience in developing and deploying microservices in a real-world application using git workflow.

<p align="right">(<a href="#top">back to top</a>)</p>

## Contact

[Sarah Folk](https://www.linkedin.com/in/sarahfolk11/)

<p>
 <a href="https://www.linkedin.com/in/sarahfolk11/">
 <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white">
 </a>
 <a href="https://github.com/Sarah-Folk">
 <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white">
 </a>
</p>

[Stephen Perkins](https://www.linkedin.com/in/stephen-perkins-45310a4b/)

<p>
 <a href="https://www.linkedin.com/in/stephen-perkins-45310a4b/">
 <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white">
 </a>
 <a href="https://github.com/s-perk">
 <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white">
 </a>
</p>

[Xiao Wen Wu](https://www.linkedin.com/in/xiaowen-wu/)

<p>
 <a href="https://www.linkedin.com/in/xiaowen-wu/">
 <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white">
 </a>
 <a href="https://github.com/Immatrainz">
 <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white">
 </a>
</p>

[Kyle Bradford](https://www.linkedin.com/in/kyle-h-bradford/)

<p>
 <a href="https://www.linkedin.com/in/kyle-h-bradford/">
 <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white">
 </a>
 <a href="https://github.com/Mrkonflake">
 <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white">
 </a>
</p>

[Ermin Sljivo](https://www.linkedin.com/in/ermin-s/)

<p>
 <a href="https://www.linkedin.com/in/ermin-s/">
 <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white">
 </a>
 <a href="https://github.com/Ermin17">
 <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white">
 </a>
</p>

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
