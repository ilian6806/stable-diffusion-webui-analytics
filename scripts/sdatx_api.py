

import gradio as gr
import modules.shared as shared
import modules.script_callbacks as script_callbacks

from fastapi import FastAPI
from fastapi.responses import FileResponse


class SdatxApi():

    BASE_PATH = '/sdatx'

    def get_path(self, path):
        return f"{self.BASE_PATH}{path}"

    def add_api_route(self, path: str, endpoint, **kwargs):
        return self.app.add_api_route(self.get_path(path), endpoint, **kwargs)

    def start(self, _: gr.Blocks, app: FastAPI):
        self.app = app
        self.add_api_route('/config.json', self.get_config, methods=['GET'])

    def get_config(self):
        return FileResponse(shared.cmd_opts.ui_settings_file)

try:
    api = SdatxApi()
    script_callbacks.on_app_started(api.start)
except:
    pass