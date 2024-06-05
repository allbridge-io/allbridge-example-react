import React from 'react';
import {atomOneDark} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import SyntaxHighlighter from 'react-syntax-highlighter';

interface HighlighterProps {
    children: string;
}

const Highlighter: React.FC<HighlighterProps> = ({ children }) => {
    return <SyntaxHighlighter children={children} language="javascript" style={atomOneDark} />;
}

export default Highlighter;
