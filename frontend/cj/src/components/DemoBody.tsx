import Col from 'react-bootstrap/Col'
import ExamplePopover from '@/components/ExamplePopover'
import ExampleOffcanvas from './ExampleOffcanvas'

const ExampleComponents: React.FC = () => {
  return (
    <>
      <Col lg={8} className="px-0">
        <p className="fs-4">
          This is the future landing page of Crypto Journal. <br />
          It will be a place where you can find: <br />
          * The latest news about cryptocurrency <br />
          * Information about different cryptocurrencies <br />
          * Information about different cryptocurrency exchanges <br />
          * Information about different cryptocurrency wallets <br />
          * Information about different cryptocurrency mining pools <br /> <br />
          About the website: <br />
          <a href="https://getbootstrap.com/">Bootstrap 5</a> and uses React and Next.js to compile
          and bundle our Sass. It also features a handful of custom React components built using{' '}
          <a href="https://react-bootstrap.github.io/">React Bootstrap</a>.
        </p>
        <p>If this button appears blue and the link appears purple, you&apos;ve done it!</p>
      </Col>

      <ExampleOffcanvas className="me-3" />
      <ExamplePopover />
    </>
  )
}

export default ExampleComponents
