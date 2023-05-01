import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CTUGroupImage from "../../../assets/ctubackground.jpg";

import _ from "lodash";
import { useTranslation } from "react-i18next";
import { seo } from "../../../libs/helper";
import { retrieveResearchGroup } from "../../../store/researchGroupSlice";

const ResearcherGroup = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('common');

  useEffect(() => {
    dispatch(retrieveResearchGroup(props.match.params.id)).then((response) => {
      seo({
        title: response.payload.groupName,
        metaDescription: response.payload.groupName,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderMembers = (members) => {
    if (members && members.length > 0) {
      const renderedMembers = members.map((member,index) => {
        const userId = member.userProfile ? member.userProfile.id : member.id;

        const omitUserProfile = _.omit(member, ["userProfile"]);
        const userProfile = member.userProfile
          ? member.userProfile
          : omitUserProfile;

        return (
          <div className="col-lg-3" key={index}>
            <div className="mk-member-card">
              <div className="mk-card shadow-sm p-3 bg-body rounded">
                <div className="mk-card-image">
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                    src={userProfile.avatar}
                    alt="avatar"
                  />
                </div>
                <div className="mk-card-body">
                  <h5
                    className="mk-card-text"
                    data-toggle="tooltip"
                    title={userProfile.fullName}
                  >
                    {" "}
                    {userProfile.fullName}
                  </h5>
                  <p
                    data-toggle="tooltip"
                    title={userProfile.qualification}
                    style={{ fontStyle: "italic" }}
                  >
                    {" "}
                    {userProfile.qualification}
                  </p>
                  <p
                    data-toggle="tooltip"
                    title={userProfile.qualification}
                    style={{ fontStyle: "italic" }}
                  >
                    {" "}
                    {userProfile.email}
                  </p>
                  <Link
                    to={`/nhom-nghien-cuu/${props.group?.id}/thanh-vien/${userId}`}
                  >
                    <button className="btn btn-primary mt-3">
                      { t('research-group.members.card.btn-text') }
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      });

      return (
        <div className="mt-4 mb-4">
          <div className="row justify-content-center" style={{ rowGap: "20px" }}>
            {renderedMembers}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <div
        className="mk-project-bg mb-4"
        style={{
          display: "flex",
          alignItems: "center",
          height: "350px",
          backgroundImage: `linear-gradient(to right,rgba(25 110 180 / 100%), rgba(123, 121, 123, 0.7)), url(${CTUGroupImage})`,
          objectFit: "contain",
          objectPosition: "bottom",
        }}
      >
        <div
          className="container"
          style={{ color: "white", fontSize: "20px", fontWeight: "700", textAlign: "center" }}
        >
          { props.group ? props.group.groupName : "" }
        </div>
      </div>

      <div className="container">
        <h4 className="text-uppercase">{ t('research-group.introduction.title') }</h4>
        <div
          dangerouslySetInnerHTML={{
            __html: props.group ? props.group.introduction : "",
          }}
        />
        <h4 className="text-uppercase">{ t('research-group.topics.title') }</h4>
        <div
          dangerouslySetInnerHTML={{
            __html: props.group ? props.group.researchTopic : "",
          }}
        />
        <h4 className="text-uppercase">{ t('research-group.members.title') }</h4>
        <section className="flex mt-4">
          {renderMembers(props.group ? props.group.groupDetailList : [])}
        </section>
        <h4 className="text-uppercase">{ t('research-group.publication.title') }</h4>
        <div
          dangerouslySetInnerHTML={{
            __html: props.group ? props.group.publication : "",
          }}
        />
      </div>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    group: state.researchGroups.data
      ? state.researchGroups.data[ownProps.match.params.id]
      : [],
  };
};

export default connect(mapStateToProps, {})(ResearcherGroup);
