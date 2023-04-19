import { useTranslation } from "react-i18next";

const Template = (props) => {
  const {
    project,
    renderedNavbar,
    renderedContent,
    renderedOtherActions,
    renderRelatedProjects,
  } = props;

  const { t } = useTranslation('common');

  return (
    <>
      <div className="container-fluid">
        <div
          className="row mk-project-bg"
          style={{
            backgroundImage: `linear-gradient(rgb(255 255 255 / 90%), rgba(123, 121, 123, 0.9)), url(${
              project.projectImage ? project.projectImage : project.productImage
            })`,
            objectFit: "contain",
          }}
        >
          <div className="mk-project-bg-content mt-2 z-10 d-flex flex-column align-items-center align-self-center w-75 gap-3 mx-auto text-center">
            <h2>{project.name}</h2>
            <p className="mk-project-description">
              {" "}
              {project.shortDescription}{" "}
            </p>
          </div>
        </div>
        <div className="container mk-project-container">
          <div className="row">
            <div className="col-lg-3">
              { renderedNavbar }
              { renderedOtherActions }
            </div>
            <div className="col-lg-9">
              { renderedContent }
              <div className="row">
                <div className="col">
                  <h5>{t("project.commercial.related-projects.title")}</h5>

                  { renderRelatedProjects }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Template;
