import React from 'react';
import config from '../../config';
import './Credits.css';

function Credits() {
    const { authors, specialSupporters, contributers } = config.credits;

    const renderCreditSection = (title, people, roleLabel) => (
        <div className="credit-section">
            <h3 className="credit-title">{title}</h3>
            <div className="credit-list">
                {people.map((person, index) => (
                    <div key={index} className="credit-item">
                        <div className="credit-name">{person.name}</div>
                        <div className="credit-discord">
                            <img
                                src="https://www.svgrepo.com/show/353655/discord-icon.svg"
                                alt="Discord"
                                className="discord-icon"
                            />
                            {person.discordId}
                        </div>
                        <div className="credit-description">{person.description}</div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="credits container">
            <div className="credits-content">
                <h2 className="credits-heading">Credits</h2>
                <p className="credits-intro">このサイトの制作・運営に携わった方々です。</p>

                {authors.length > 0 && renderCreditSection('Author', authors, 'author')}
                {specialSupporters.length > 0 && renderCreditSection('Special Supporter', specialSupporters, 'special-supporter')}
                {contributers.length > 0 && renderCreditSection('Contributer', contributers, 'contributer')}

                <div className="credits-footer">
                    <p>DA3 UnOfficial Support Toolは有志により制作・運営されています。</p>
                </div>
            </div>
        </div>
    );
}

export default Credits;
