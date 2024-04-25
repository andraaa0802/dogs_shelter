import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';

function About() {
    return (
        <div>
            <Header />
            <Breadcrumbs path="Despre noi" />

            <section>
                <div className="container">
                    <div className="row d-flex no-gutters">

                        <div className="col-md-7 pl-md-5 py-md-5">
                            <div className="heading-section pt-md-5">
                                <h2 className="mb-4">Cine suntem noi?</h2>
                                <p className="about">Dogs Rescuers este un adăpost canin dedicat salvării și îngrijirii câinilor fără stăpân. Toți câinii noștri se dezvoltă armonios sub atenta supraveghere a veterinarului nostru.</p>
                                <h2 className="mb-4">Care este scopul nostru?</h2>
                                <p className="about">Scopul nostru este de a ajuta cât mai mulți câini să aibă o viață fericită. Chiar dacă adăpostul nostru este unul cald și primitor, ne dorim ca fiecare câine să aibă șansa de a avea propria lui familie iubitoare. Astfel, suntem într-o permanentă căutare de oameni buni, doritori de un prieten patruped loial și afectuos.</p>
                                <h2 className="mb-4">Cum funcționează adopțiile?</h2>
                                <p className="about">Foarte simplu! Vă așteptăm direct în adăpost să vă alegeți blănosul sau răsfoiți paginile site-ului nostru pentru a cunoaște câinii adăpostului, completați formularul de adopție, iar noi vă vom contacta pentru a stabili o întâlnire.</p>
                            </div>

                        </div>
                        <div className="col-md-5 d-flex">
                            <div className="img d-flex mb-4 mb-sm-0" style={{ backgroundImage: 'url(images/despre.jpg)' }}>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div>

            </div>
            <Footer />
        </div>
    );
}

export default About;
