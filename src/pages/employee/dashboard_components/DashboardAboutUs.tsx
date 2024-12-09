import React, { useEffect, useState } from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'; // Ensure this is imported
import apiService from '../../../services/api';
import '../../../assets/styles/components/_dashboardAbout.scss';

const DashboardAboutUs: React.FC = () => {
    const [editorState, setEditorState] = useState<EditorState>(() =>
        EditorState.createEmpty()
    );

    // Load content from the API
    const loadContent = async () => {
        try {
            const response = await apiService.getAboutUs();
            if (response.content) {
                const contentState = convertFromRaw(JSON.parse(response.content));
                setEditorState(EditorState.createWithContent(contentState));
            }
        } catch (error) {
            console.error('Error loading About Us content:', error);
        }
    };

    // Save content to the API
    const saveContent = async () => {
        try {
            const rawContent = convertToRaw(editorState.getCurrentContent());
            await apiService.updateAboutUs(JSON.stringify(rawContent));
        } catch (error) {
            console.error('Error saving About Us content:', error);
        }
    };

    useEffect(() => {
        loadContent();
    }, []);

    return (
        <div className="aboutuspage">
            <section>
                <h1>About Us</h1>
                <Editor
                    editorState={editorState}
                    onEditorStateChange={setEditorState}
                    toolbar={{
                        options: [
                            'inline',
                            'blockType',
                            'fontSize',
                            'fontFamily',
                            'list',
                            'textAlign',
                            'history',
                        ],
                        inline: {
                            options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
                        },
                        blockType: {
                            inDropdown: true,
                            options: ['Normal', 'H1', 'H2', 'H3', 'Blockquote', 'Code'],
                        },
                        fontSize: {
                            inDropdown: true, // Ensure dropdown is enabled
                            options: [8, 10, 12, 14, 16, 18, 24, 30],
                        },
                        fontFamily: {
                            inDropdown: true, // Ensure dropdown is enabled
                            options: ['Arial', 'Georgia', 'Tahoma', 'Verdana', 'Times New Roman'],
                        },
                    }}
                    toolbarClassName="toolbar-class"
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                />
                <button onClick={saveContent}>Save</button>
            </section>
        </div>
    );
};

export default DashboardAboutUs;
