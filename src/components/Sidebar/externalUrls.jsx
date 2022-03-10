import { ReactComponent as ForumIcon } from "../../assets/icons/forum.svg";
import { ReactComponent as GovIcon } from "../../assets/icons/governance.svg";
import { ReactComponent as DocsIcon } from "../../assets/icons/docs.svg";
import { ReactComponent as FeedbackIcon } from "../../assets/icons/feedback.svg";
import { SvgIcon } from "@material-ui/core";
import { Trans } from "@lingui/macro";

const externalUrls = [

  {
    title: <Trans>Docs</Trans>,
    url: "https://noaharkdao.gitbook.io/noaharkdao/",
    icon: <SvgIcon color="primary" component={DocsIcon} />,
  }
];

export default externalUrls;
