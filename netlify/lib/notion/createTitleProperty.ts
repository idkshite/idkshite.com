export function createTitleProperty(content: string): any{
    return {
        title: [
            {
                text: {
                    content,
                },
            },
        ],
    }
}
