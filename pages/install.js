import { Layout, Page, SettingToggle, TextStyle } from "@shopify/polaris";
import React, { useEffect, useState } from "react";

function install() {
  // State variables to track and display the installation status of the script
  const [isInstalled, setIsInstalled] = useState(null);
  const titleDescription = isInstalled ? "Uninstall" : "Install";
  const bodyDescription = isInstalled ? "installed" : "uninstalled";

  function handleAction() {
    setIsInstalled((oldValue) => !oldValue);
  }

  return (
    <Page>
      {/* Just the description to display what the page does */}
      <Layout.AnnotatedSection
        title={`${titleDescription} banner`}
        description="Toggle banner installation on your shop"
      >
        {/* Section with a button to install/uinstall the state */}
        <SettingToggle
          action={{
            content: titleDescription,
            onAction: handleAction,
          }}
          enabled={true}
        >
          {/* Show the status of whether the script is installed or not */}
          The banner script is{" "}
          <TextStyle variation="strong">{bodyDescription}</TextStyle>
        </SettingToggle>
      </Layout.AnnotatedSection>
    </Page>
  )
}

export default install;