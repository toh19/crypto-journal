import Col from 'react-bootstrap/Col'
import ExamplePopover from '@/components/ExamplePopover'
import ExampleOffcanvas from './ExampleOffcanvas'

const ExampleComponents: React.FC = () => {
  return (
    <>
      <Col lg={8} className="px-0">
        <p className="fs-4">
          You&apos;ve successfully loaded the Bootstrap + React example! It&apos;s loaded up with{' '}
          <a href="https://getbootstrap.com/">Bootstrap 5</a> and uses React and Next.js to compile
          and bundle our Sass. It also features a handful of custom React components built using{' '}
          <a href="https://react-bootstrap.github.io/">React Bootstrap</a>.
        </p>
        <p>If this button appears blue and the link appears purple, you&apos;ve done it!</p>
      </Col>

      <ExampleOffcanvas className="me-3" />
      <ExamplePopover />
      <hr className="col-1 my-5 mx-0" />

      <div className="p-5 mb-4 bg-body-tertiary rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Custom jumbotron</h1>
          <p className="col-md-8 fs-4">
            Using a series of utilities, you can create this jumbotron, just like the one in
            previous versions of Bootstrap. Check out the examples below for how you can remix and
            restyle it to your liking.
          </p>
          <button className="btn btn-primary btn-lg" type="button">
            Example button
          </button>
        </div>
      </div>
    </>
  )
}

export default ExampleComponents
