import React from "react";
import "./App.css";

export const ZumaBiography: React.FC = () => {
  return (
    <div className="container">
      <header className="header">
        <h1>Jacob Gedleyihlekisa Zuma</h1>
        <p>Former President of South Africa</p>
      </header>

      <section className="bio-section">
        <h2>Early Life and Anti-Apartheid Struggles</h2>
        <p>
          Jacob Gedleyihlekisa Zuma was born on April 12, 1942, in Nkandla,
          South Africa. Despite having no formal education, Zuma joined the
          African National Congress (ANC) in 1959. He quickly became involved in
          the ANC's armed wing, Umkhonto we Sizwe (MK), which fought against the
          apartheid regime. Zuma was arrested in 1963 and served 10 years on
          Robben Island alongside Nelson Mandela and other anti-apartheid
          activists.
        </p>
        <img
          src="https://www.presidency.gov.za/sites/default/files/inline-images/Jacob%20Zuma_bw_169.jpg"
          alt=" Jacob Zuma"
          className="bio-image"
        />
      </section>

      <section className="bio-section">
        <h2>Rising Through the ANC</h2>
        <p>
          After his release from Robben Island in 1973, Zuma rose within the
          ranks of the ANC and continued his involvement in the anti-apartheid
          struggle. He participated in key negotiations to dismantle apartheid
          in South Africa, earning a reputation as a skilled negotiator and
          diplomat. By the late 1990s, Zuma was serving as the deputy president
          of both the ANC and South Africa.
        </p>
        <img
          src="http://groundup.org.za/sites/default/files/styles/article_image/public/field/image/640px-Jacob_Zuma%2C_2009_World_Economic_Forum_on_Africa-10.jpg?itok=PmeEX7TT"
          alt="Jacob Zuma "
          className="bio-image"
        />
      </section>

      <section className="bio-section">
        <h2>Presidency (2009-2018)</h2>
        <p>
          Zuma ascended to the presidency in 2009 after defeating Thabo Mbeki in
          a contentious ANC leadership contest. His presidency was marked by
          both positive economic reforms and significant controversies. Zuma was
          involved in initiatives like the National Planning Commission, aimed
          at addressing economic inequality, but also faced accusations of
          corruption, including the Nkandla scandal where public funds were used
          to upgrade his private residence.
        </p>
        <img
          src="https://cms.groupeditors.com/img/f02ee7f0-feb4-4e2e-826c-49fdf1f89b9d.jpg?crop=100,0,500,400&w=400&h=400&scale=both"
          alt="Jacob Zuma "
          className="bio-image"
        />
      </section>

      <section className="bio-section">
        <h2>Resignation and Post-Presidency</h2>
        <p>
          Zuma's presidency ended in February 2018 when he was recalled by the
          ANC's National Executive Committee. Under pressure, he resigned, and
          Cyril Ramaphosa took over as president. Post-presidency, Zuma has been
          entangled in numerous legal battles related to corruption and fraud
          charges. He remains a controversial figure in South African politics.
        </p>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT9OJA-kODhKZ_LITB71ZZw6GM9Nc1iDEuAg&s"
          alt=" Jacob Zuma"
          className="bio-image"
        />
      </section>

      <section className="bio-section">
        <h2>Recent Developments</h2>
        <p>
          In 2023, Zuma returned to political relevance by supporting and
          leading the new Umkhonto we Sizwe Party, which is named after the
          ANC’s former military wing. The party has gathered momentum,
          especially in rural areas, demonstrating Zuma's continued influence in
          South African politics. His daughter also recently made headlines by
          becoming the 16th wife of the king of Eswatini.
        </p>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHMfvUZJeQ7VEuUmEIPYBW32p9SHFNhuAm-g&s"
          alt="Jacob Zuma "
          className="bio-image"
        />
      </section>

      <footer className="footer">
        <p>&copy; 2024 Jacob Zuma Biography. All Rights Reserved.</p>
      </footer>
    </div>
  );
};
