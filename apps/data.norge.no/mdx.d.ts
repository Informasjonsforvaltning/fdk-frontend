declare module '*.mdx' {
    let MDXComponent: (props: any) => JSX.Element; // eslint-disable-line
    export default MDXComponent;
}
