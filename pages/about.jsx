import Header from "../src/components/header/Header";

export default function About() {
  return (
    <main className="w-full h-full bg-base-100 jeffBack bg-repeat bg-[url('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')]">
      <Header />
      <div className="flex bg-base-100 opacity-70 flex-col items-center h-full m-auto md:w-1/2 [&>*]:my-4">
        <header>
          My ma always told me: seek out a wise investor and make their dreams reality
        </header>
        <article className="flex flex-col items-center h-full [&>*]:my-4">
          <p>
            We couldn&apos;t have done this without our founder and founding investor, Jeff. Forever
            we will remember Jeff and honor his sacrifice to make Mise En Place a reality.
          </p>
          <p>
            Forever we will cherish Jeff&apos;s contribution to our species, the human race. Upon
            this earth came Mise, birthed from the brainchild Jeff.
          </p>
          <p>
            Legend has it that Jeff, our great founder, was struck by divine inspiration while
            scaling the treacherous slopes of Mount Everest. Braving frigid temperatures and gusty
            winds, he pondered the secrets of the universe, and in a moment of sheer genius, the
            concept of Mise En Place materialized in his frostbitten mind.
          </p>
          <p>
            Upon his triumphant return to civilization, Jeff began assembling a team of the
            world&apos;s greatest minds – chefs, designers, programmers, and philosophers – all
            united under the sacred banner of Mise En Place. Together, they toiled day and night,
            fueled by nothing but the unyielding power of Jeff&apos;s vision and a steady supply of
            energy drinks and instant ramen.
          </p>
          <p>
            As the company flourished, so too did the legend of our founder. It is said that Jeff
            could recite the entire Mise En Place codebase from memory and was able to debug even
            the most obscure issues using only the power of his mind. His leadership style was
            unparalleled, striking the perfect balance between nurturing mentor and uncompromising
            visionary.
          </p>
          <p>
            And so, we pay homage to Jeff, our fearless founder, with this background image repeat,
            ensuring that his visage is forever etched into the annals of Mise En Place history. May
            his spirit guide us as we continue our quest for culinary perfection and world
            domination, one well-organized kitchen at a time.
          </p>
        </article>
      </div>
    </main>
  );
}
