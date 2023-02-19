const Tag = (prop: { tag: string, className?: string }) => {
    return (<a className={`tag me-2 ${prop.className}`} style={{ textDecoration: 'none' }} ><b>#{prop.tag}</b></a>)
}

export default Tag