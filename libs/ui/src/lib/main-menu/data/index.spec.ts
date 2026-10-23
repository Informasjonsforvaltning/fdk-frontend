import { getLocalization } from "@fdk-frontend/localization";
import getMainMenuData from ".";

describe("getMainMenuData", () => {
  it.each([
    { title: "Brukarrettleiing", href: "/nn/docs" },
    { title: "Datalandsbyen", href: "/nn/docs/community" },
  ])("uses the Nynorsk page title for $href", ({ title, href }) => {
    const { help } = getMainMenuData(getLocalization("nn").common, "nn");

    expect(help).toContainEqual({ title, href });
  });
});
