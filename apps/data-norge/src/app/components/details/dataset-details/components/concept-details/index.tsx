import { PropsWithChildren, useContext } from 'react';

import { Heading, Link } from '@digdir/designsystemet-react';
import Article from '@fdk-frontend/ui/article';

import PlaceholderBox from '../../../placeholder-box';
import { DatasetDetailsContext } from '../..';

const ConceptDetails = ({ fields, ...props }: { fields: any } & PropsWithChildren) => {
    const { showEmptyRows } = useContext(DatasetDetailsContext);

    if (!showEmptyRows && fields === null) return false;

    return (
        <section>
            <Heading
                level={4}
                size='xxsmall'
            >
                Begreper brukt i datasett
            </Heading>
            {fields !== null ? (
                <dl>
                    <dt>
                        <Link href='#'>felles omsorg</Link>
                    </dt>
                    <dd>
                        <Article>
                            omsorgssituasjon der begge foreldre til et gitt barn bor sammen og har omsorgen for barnet i
                            skattleggingsperioden
                        </Article>
                    </dd>
                    <dt>
                        <Link href='#'>samlet uføreytelse fra andre enn folketrygden</Link>
                    </dt>
                    <dd>
                        <Article>
                            samlet brutto uføreytelser (uføreytelser før skatt) som du får fra andre enn folketrygden (
                            herunder uføreytelser fra SPK, uføreytelser fra andre pensjonsordninger herunder
                            uføreytelser fra IPA/IPS og uføreytelser fra utlandet) . Uføreytelser regnes som en del av
                            inntektene dine og skattlegges som vanlig lønnsinntekt.
                        </Article>
                    </dd>
                </dl>
            ) : (
                <PlaceholderBox>Ingen begreper oppgitt</PlaceholderBox>
            )}
        </section>
    );
};

export default ConceptDetails;
