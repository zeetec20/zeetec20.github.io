const Tag = (prop: { tag: string, className?: string }) => {
    return (<span className={`tag me-2 ${prop.className}`} style={{ textDecoration: 'none' }} ><b>#{prop.tag}</b></span>)
}

export default Tag