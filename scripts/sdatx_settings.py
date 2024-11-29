import modules.shared as shared
import gradio as gr

from modules import scripts

def on_ui_settings():

    section = ('sd_analytics', 'Analytics')

    shared.opts.add_option("sd_analytics_google_client_id", shared.OptionInfo("", "Google Client Id", section=section))

    shared.opts.add_option("sd_analytics_firebase_config", shared.OptionInfo("", "Firebase Config", section=section))

scripts.script_callbacks.on_ui_settings(on_ui_settings)
