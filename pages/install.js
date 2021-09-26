import { Layout, Page, SettingToggle, TextStyle } from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import { useAxios } from '../hooks/useAxios';

function install() {
  const [axios] = useAxios();
  // State variables to track and display the installation status of the script
  const [isInstalled, setIsInstalled] = useState(null);
  const titleDescription = isInstalled ? "Uninstall" : "Install";
  const bodyDescription = isInstalled ? "installed" : "uninstalled";

  // Deleting the latest Script tag, assuming there is only one, given the app flow
  // UseEffect stores the latest script tag in scriptTagId
  // 
  const [scriptTagId, setScriptTagId] = useState();

  // Get all Script tags
  async function fetchScriptTags() {
    const { data } = await axios.get('/script_tag/all');
    setIsInstalled(data.installed);
    if (data.details.length > 0) {
      setScriptTagId(data.details[0].id);
    }
  }
  
  // Called whenever isInstalled changes
  useEffect(() => {
    fetchScriptTags();
  }, [isInstalled]);

  async function handleAction() {
    if (!isInstalled) {
      // script_tag is the prefix on server/router/script_tag.js
      axios.post('/script_tag');
    } else {
      axios.delete(`script_tag?id=${scriptTagId}`);
    }
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