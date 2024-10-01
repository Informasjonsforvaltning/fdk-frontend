const SiteNavigation = () => {
	return (
		<div className={styles.links}>
            <div className={styles.linkSection}>
                <Heading
                    className={styles.linkSectionHeader}
                    level={3}
                    size='sm'
                >
                    {dictionary.mainMenu.catalogs.heading}
                </Heading>
                <ul>
                    {mainMenuData.catalogs.map((item) => (
                        <li key={item.key}>
                            <Link
                                className={styles.iconLink}
                                href={item.href}
                            >
                                <CatalogIcon
                                    catalog={item.key as CatalogTypes}
                                    fontSize='1.5em'
                                />
                                {item.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.linkSection}>
                <Heading
                    className={styles.linkSectionHeader}
                    level={3}
                    size='sm'
                >
                    {dictionary.mainMenu.help.heading}
                </Heading>
                <ul>
                    {mainMenuData.help.map((item) => (
                        <li key={item.href}>
                            <Link href={item.href}>
                                {item.title}
                                {item.external && <ExternalLinkIcon fontSize='1em' />}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.linkSection}>
                <Heading
                    className={styles.linkSectionHeader}
                    level={3}
                    size='sm'
                >
                    {dictionary.mainMenu.tools.heading}
                </Heading>
                <ul>
                    {mainMenuData.tools.map((item) => (
                        <li key={item.href}>
                            <Link href={item.href}>{item.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.linkSection}>
                <Heading
                    className={styles.linkSectionHeader}
                    level={3}
                    size='sm'
                >
                    {dictionary.mainMenu.about.heading}
                </Heading>
                <ul>
                    {mainMenuData.about.map((item) => (
                        <li key={item.href}>
                            <Link href={item.href}>{item.title}</Link>
                        </li>
                    ))}
                    {footerData.policies.map((item) => (
                        <li key={item.href}>
                            <Link href={item.href}>
                                {item.title}
                                {item.external && <ExternalLinkIcon fontSize='1em' />}
                            </Link>
                        </li>
                    ))}
                    <li>
                        <Link
                            className={styles.iconLink}
                            href={footerData.githubUri}
                        >
                            <GithubLogo fontSize='1.25em' />
                            {dictionary.footer.githubFollow}
                            <ExternalLinkIcon fontSize='1em' />
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
	);
}