import FeatureItemLeft from "./FeatureItemLeft";
import FeatureItemRight from "./FeatureItemRight";

const Feature = () => {
  return (
    <section className="mt-4">
      <div className="row">
        <div className="col-md-12">
          <FeatureItemLeft
            featureTitle="Expense Tracking"
            featureDesc="Easily monitor and categorize daily expenses to understand spending habits and manage your budget effectively."
            featureImage="https://plus.unsplash.com/premium_photo-1681589453747-53fd893fa420?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            featureId="myImage1"
          ></FeatureItemLeft>
        </div>
        <div className="col-md-12">
          <FeatureItemRight
            featureTitle="Income Tracking"
            featureDesc="Log and categorize various income sources to gain insights into your financial inflows and optimize your earnings."
            featureImage="https://images.unsplash.com/photo-1676151863828-5774d01de34b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          ></FeatureItemRight>
        </div>
        <div className="col-md-12">
          <FeatureItemLeft
            featureTitle="Budget Management"
            featureDesc="Set, manage, and receive alerts for budgets across different expense categories, empowering you to allocate funds wisely."
            featureImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          ></FeatureItemLeft>
        </div>
        <div className="col-md-12">
          <FeatureItemRight
            featureTitle="Financial Reports"
            featureDesc="Generate detailed reports with visualizations to analyze spending patterns, identify trends, and make informed financial decisions."
            featureImage="https://plus.unsplash.com/premium_photo-1681487912304-274bac203320?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          ></FeatureItemRight>
        </div>
        <div className="col-md-12">
          <FeatureItemLeft
            featureTitle="Goal Setting"
            featureDesc="Set and track personalized financial goals, from saving for vacations to creating emergency funds, to achieve financial success."
            featureImage="https://images.unsplash.com/photo-1596008194705-2091cd6764d4?q=80&w=1039&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          ></FeatureItemLeft>
        </div>
      </div>
    </section>
  );
};

export default Feature;
