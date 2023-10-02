import { type FC } from 'react';
import { Page } from '@/widgets/Page';
import { Grid, Typography, styled } from '@mui/material';
import { getSettings } from '@/entities/Settings';
import { Settings } from '@/shared/types/enums';

const AboutTypography = styled(Typography)({
    textAlign: 'justify',
    margin: '10px',
}) as typeof Typography;

const AboutPage: FC = () => {
    return (
        <Page>
            <Grid
                container
                spacing={1}
                justifyContent={'center'}
                alignItems={'center'}
                marginTop={'1vw'}>
                <Typography
                    variant="h1"
                    textAlign={'center'}
                    width={'100%'}></Typography>
                <Grid item xs={12} sm={6}>
                    <img src="/images/about.jpg" style={{ maxWidth: '100%' }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AboutTypography variant="h4">
                        We are two cosplayers and crafters - Valetz and Peppy.
                        We really love to create cosplay and new props for it
                        and have been doing this for over 10 years.
                    </AboutTypography>
                    <AboutTypography variant="h4">
                        We are happy to share our creativity with you.
                    </AboutTypography>
                    <AboutTypography variant="h4">
                        You can order any wig, costume or craft that is
                        presented on our page or make an individual order. We
                        are open to COSPLAY COMMISSIONS all over the world! All
                        of our cosplays are custom made to your measurements and
                        take time to create. For all questions, write to us on
                        social networks and e-mail {getSettings(Settings.EMAIL)}
                    </AboutTypography>
                    <AboutTypography variant="h4">
                        Instagram {getSettings(Settings.INSTA_SHORT)}
                    </AboutTypography>
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        variant="h1"
                        textAlign={'center'}
                        width={'100%'}>
                        Please read the rules of our store!
                    </Typography>
                    <AboutTypography variant="h3">
                        1. CUSTOM COMMISSIONS
                    </AboutTypography>
                    <AboutTypography variant="h5">
                        We accept individual orders, (on characters that are not
                        in our store or your original character) for all
                        questions, write messages. All rules of our store apply
                        to individual orders and regular listings.
                    </AboutTypography>
                    <AboutTypography variant="h3">2. DELIVERY</AboutTypography>
                    <AboutTypography variant="h5">
                        We are not responsible for the operation of postal
                        services. In case of a delay the parcels, we do our best
                        to help you. We independently leave an application for
                        the search for parcels, but it should be borne in mind
                        that the response to the search may take several months.
                        Depending on the search results, we will refund you part
                        of the payment or make an order again. Due to the
                        pandemic situation, many packages are delayed.
                    </AboutTypography>
                    <AboutTypography variant="h3">3. PAYMENT</AboutTypography>
                    <AboutTypography variant="h5">
                        Payment plans are accepted. For example, you can pay the
                        agreed monthly amount. But there are several conditions:
                        <ul>
                            <li>
                                We will stop working on the costume if you are
                                late in payments. Thus, the creation time of the
                                costume increases.
                            </li>
                            <li>
                                We do not refund money if you want to stop
                                payments, since part of the work has already
                                been completed and materials have been
                                purchased.
                            </li>
                        </ul>
                        But we can send you unfinished item, delivery in this
                        case is paid by the buyer separately
                    </AboutTypography>
                    <AboutTypography variant="h3">4. SIZE</AboutTypography>
                    <AboutTypography variant="h5">
                        After ordering, we send customers instructions for
                        taking measurements. Please follow the instructions
                        exactly. You are responsible for taking your
                        measurements. Sometimes we may need additional
                        measurements, please stay in touch
                    </AboutTypography>
                    <AboutTypography variant="h3">5. DEADLINES</AboutTypography>
                    <AboutTypography variant="h5">
                        The production time for each order is discussed
                        individually with every customer, at the time of placing
                        the order. If you need an order urgently, we can agree
                        on it. But the price in this case will be more
                        expensive.
                    </AboutTypography>
                    <AboutTypography variant="h3">6.NO REFUNDS</AboutTypography>
                    <AboutTypography variant="h5">
                        Each order is made individually, tailored to your size.
                        We are a small shop and we have no production, all the
                        things we create are handmade. Therefore, we do not
                        issue returns. If you have problems with your order
                        please contact us within 3 days after receiving and we
                        will try to solve the problem together. If you contact
                        us later than three days later, we assume that the item
                        has already been used and in this case no return is
                        possible.
                    </AboutTypography>
                    <AboutTypography variant="h3">
                        7. NO CANCELLATION
                    </AboutTypography>
                    <AboutTypography variant="h5">
                        We do not make cancellations. Please get to know all the
                        details and read the description carefully BEFORE
                        ordering.
                    </AboutTypography>
                </Grid>
            </Grid>
        </Page>
    );
};

export default AboutPage;
