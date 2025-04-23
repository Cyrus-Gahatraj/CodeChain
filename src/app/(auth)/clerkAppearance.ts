import type {Appearance} from "@clerk/types";

const clerkAppearance: Appearance={
          baseTheme: undefined,
          elements: {
            rootBox: "w-full max-w-md",
            card: "bg-black border border-gray-800 shadow-lg shadow-orange-500/10",
            headerTitle: "text-orange-400 font-semibold",
            headerSubtitle: "text-gray-300",

            socialButtonsBlockButton:
              "!bg-[#0f0f0f] !text-white !p-2  hover:!bg-white/10 transition-all hover:shadow-md",

            dividerLine: "bg-gray-800",
            dividerText: "text-gray-400",
            formFieldLabel: "text-gray-300 font-medium",
            formFieldInput:
              "bg-gray-900 border-gray-800 text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 rounded-lg transition-all",
            formButtonPrimary:
              "bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-medium shadow hover:shadow-orange-500/20 transition-all",
            footerActionText: "text-gray-400",
            footerActionLink:
              "text-orange-400 hover:text-orange-300 font-medium transition-colors",

            identityPreviewEditButton: "text-gray-300 hover:text-white",
            userButtonPopoverActionButtonText: "text-gray-300",
            userButtonPopoverFooter: "text-gray-400",
            badge: "text-gray-300 bg-gray-800",
            headerBackLink: "text-gray-400 hover:text-orange-400",
            alternativeMethodsBlockButton:
              "text-gray-400 hover:text-orange-400",
            cardBox: "backdrop-blur-sm bg-black/80",
          },
          variables: {
            colorPrimary: "#ea591f",
            colorBackground: "#161613",
            colorText: "#ffffff",
            colorTextOnPrimaryBackground: "#ffffff",
            colorTextSecondary: "#a0a0a0",
            colorInputBackground: "#111111",
            colorInputText: "#ffffff",
          },
          layout: {
            logoPlacement: "inside",
            socialButtonsPlacement: "bottom",
            socialButtonsVariant: "blockButton",
          },
}

export default clerkAppearance;