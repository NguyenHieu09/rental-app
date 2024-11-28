
import React, { forwardRef, useImperativeHandle } from 'react';
import {
    SafeAreaView,
    View,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
} from 'react-native';
import { RichText, Toolbar, useEditorBridge } from '@10play/tentap-editor';

interface BasicProps {
    initialContent: string;
}

const Basic = forwardRef(({ initialContent }: BasicProps, ref) => {
    console.log('initialContent', initialContent);

    const editor = useEditorBridge({
        autofocus: true,
        avoidIosKeyboard: true,
        initialContent,
    });

    useImperativeHandle(ref, () => ({
        getHTML: () => editor.getHTML(),
    }));

    return (
        <SafeAreaView style={exampleStyles.fullScreen}>
            <RichText editor={editor} />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={exampleStyles.keyboardAvoidingView}
            >
                <Toolbar editor={editor} />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
});

const exampleStyles = StyleSheet.create({
    fullScreen: {
        flex: 1,
        paddingHorizontal: 10,
    },
    keyboardAvoidingView: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
    },


});

export default Basic;
