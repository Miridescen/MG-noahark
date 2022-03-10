import "./notfound.scss";
import { Trans } from "@lingui/macro";

export default function NotFound() {
  return (
    <div id="not-found">
      <div className="not-found-header">
        <h4>
          <Trans>Page not found</Trans>
        </h4>
      </div>
    </div>
  );
}
