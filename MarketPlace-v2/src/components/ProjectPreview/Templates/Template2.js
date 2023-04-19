const Template = (props) => {
  const {
    renderedNavbar,
    renderedContent,
    renderedOtherActions,
    renderRelatedProjects,
  } = props;

  return (
    <>
      <div className="container p-4">
        <div className="row">
          <div className="col-md-8">{renderedContent}</div>
          <div className="col-md-4">
            {renderedNavbar}
            {renderedOtherActions}
            {renderRelatedProjects}
          </div>
        </div>
      </div>
    </>
  );
};

export default Template;
