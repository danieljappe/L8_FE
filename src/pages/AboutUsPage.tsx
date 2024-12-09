import React, { useEffect, useState } from 'react';
import { convertFromRaw, ContentState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html'; // Use stateToHTML from draft-js-export-html
import apiService from "../services/api";
import DOMPurify from 'dompurify';
import '../assets/styles/pages/_aboutus.scss'

const AboutUsPage: React.FC = () => {
    const [htmlContent, setHtmlContent] = useState<string>('');

    const loadContent = async () => {
        try {
            // Fetch the "About Us" content from the API
            const response = await apiService.getAboutUs();

            // Parse Draft.js content and convert it to HTML
            const contentState: ContentState = convertFromRaw(JSON.parse(response.content));
            const rawHtml = stateToHTML(contentState); // Corrected to use stateToHTML

            // Sanitize the HTML to prevent XSS
            const sanitizedHtml = DOMPurify.sanitize(rawHtml);
            console.log(sanitizedHtml)
            setHtmlContent(sanitizedHtml);
        } catch (error) {
            console.error('Error loading About Us content:', error);
        }
    };

    useEffect(() => {
        loadContent();
    }, []);

    return (
        <div className="about-us-container">
            <section>
                <h1>About Us</h1>

                {/* Render the sanitized HTML content */}
                <div
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                    className="about-us-content"
                ></div>
            </section>
        </div>
    );
};

export default AboutUsPage;
