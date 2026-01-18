import clsx from "clsx";

import {
  actionMovePageLeft,
  actionMovePageRight,
  actionShortcuts,
} from "../../actions";
import { useTunnels } from "../../context/tunnels";
import { ExitZenModeButton, UndoRedoActions, ZoomActions } from "../Actions";
import { HelpButton } from "../HelpButton";
import { Section } from "../Section";
import Stack from "../Stack";
import { t } from "../../i18n";
import { ToolButton } from "../ToolButton";
import { chevronLeftIcon } from "../icons";

import type { ActionManager } from "../../actions/manager";
import type { UIAppState } from "../../types";

const Footer = ({
  appState,
  actionManager,
  showExitZenModeBtn,
  renderWelcomeScreen,
}: {
  appState: UIAppState;
  actionManager: ActionManager;
  showExitZenModeBtn: boolean;
  renderWelcomeScreen: boolean;
}) => {
  const { FooterCenterTunnel, WelcomeScreenHelpHintTunnel } = useTunnels();
  const moveLabel = t("helpDialog.movePageLeftRight");

  return (
    <footer
      role="contentinfo"
      className="layer-ui__wrapper__footer App-menu App-menu_bottom"
    >
      <div
        className={clsx("layer-ui__wrapper__footer-left zen-mode-transition", {
          "layer-ui__wrapper__footer-left--transition-left":
            appState.zenModeEnabled,
        })}
      >
        <Stack.Col gap={2}>
          <Section heading="canvasActions">
            <div
              className={clsx({
                "whiteboard-side-controls": appState.whiteboardMode,
              })}
            >
              <ZoomActions
                renderAction={actionManager.renderAction}
                appState={appState}
              />
            </div>

            {!appState.viewModeEnabled && (
              <UndoRedoActions
                renderAction={actionManager.renderAction}
                className={clsx("zen-mode-transition", {
                  "layer-ui__wrapper__footer-left--transition-bottom":
                    appState.zenModeEnabled,
                })}
              />
            )}
          </Section>
        </Stack.Col>
      </div>
      <FooterCenterTunnel.Out />
      <div
        className={clsx("layer-ui__wrapper__footer-right zen-mode-transition", {
          "transition-right": appState.zenModeEnabled,
        })}
      >
        {appState.whiteboardMode ? (
          <Stack.Row gap={1} className="whiteboard-page-nav">
            <ToolButton
              type="button"
              title={moveLabel}
              aria-label={t("labels.left")}
              icon={chevronLeftIcon}
              onClick={() =>
                actionManager.executeAction(actionMovePageLeft, "ui")
              }
            />
            <ToolButton
              type="button"
              title={moveLabel}
              aria-label={t("labels.right")}
              icon={
                <span style={{ display: "inline-flex", transform: "scaleX(-1)" }}>
                  {chevronLeftIcon}
                </span>
              }
              onClick={() =>
                actionManager.executeAction(actionMovePageRight, "ui")
              }
            />
          </Stack.Row>
        ) : (
          <div style={{ position: "relative" }}>
            {renderWelcomeScreen && <WelcomeScreenHelpHintTunnel.Out />}
            <HelpButton
              onClick={() => actionManager.executeAction(actionShortcuts)}
            />
          </div>
        )}
      </div>
      <ExitZenModeButton
        actionManager={actionManager}
        showExitZenModeBtn={showExitZenModeBtn}
      />
    </footer>
  );
};

export default Footer;
Footer.displayName = "Footer";
