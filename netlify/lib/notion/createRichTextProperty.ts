export function createRichTextProperty(content: string): any{
    return {
        rich_text: [
            {
                text: {
                    content,
                },
            },
        ],
    }
}
