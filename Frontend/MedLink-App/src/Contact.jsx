/* eslint-disable react/no-unescaped-entities */
import React from "react";
import "./Contact.css"

function Contact(){
    return(
        <div>
            <img src="./src/assets/hospitalbuild.png" alt="building" className="build"/>
            <iframe className="mapstyle" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1876.6770742191902!2d33.55360474497753!3d37.715404496658664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d76ccb5539e10b%3A0x2d4b3fb609af6eff!2zS2FyYXDEsW5hciwgS29ueWEsIFTDvHJraXll!5e0!3m2!1str!2sza!4v1716864312751!5m2!1str!2sza"></iframe>
            <div id="contact-adres">
                <h2>
                    MedLink Hastanemize Nasıl Ulaşabilirsiniz?
                </h2>
                <br />
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum natus dolorem neque assumenda sunt, adipisci voluptatibus aliquid expedita ratione eius officiis. Soluta, quasi quidem vitae quam autem rerum temporibus, aperiam totam, quod necessitatibus maiores omnis sequi commodi! Doloremque dolorum officiis voluptate optio fugit ex quasi nobis repudiandae, illo cumque quos iure itaque. Recusandae, necessitatibus. Nobis ipsum repellendus accusantium laudantium cupiditate.
                </p>
                <br />
                <p>
                    İletişim Adresimiz: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio labore iste quod.
                </p>
                <br />
                <p>
                    İletişim Numaramız: 0542 042 42 42
                </p>
                <br />
                <p>
                    İletişim Mailimiz: medlinkiletisim@gmail.com
                </p>
            </div>
        </div>
    );
}

export default Contact;