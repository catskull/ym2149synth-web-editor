import WebMidi from 'webmidi';
import store from '@/../store';
import keyboard from './keyboard';
import isSynth from './is-synth';

window.WebMidi = WebMidi;

class Application {
  constructor() {
    WebMidi.enable((err) => {
      if(err) {
        console.log('WebMidi could not be enabled.', err);
      } else {
        this.setup();
      }
    }, true);
  }

  setup() { //eslint-disable-line
    WebMidi.addListener('connected', (e) => {
      if(isSynth(e)) {
        store.dispatch('status/registerDeviceId', { id: e.id });
      }
    });

    WebMidi.addListener('disconnected', (e) => {
      if(isSynth(e)) {
        store.dispatch('status/resetStatus');
      }
    });

    WebMidi.outputs.forEach((output) => {
      if(isSynth(output)) {
        store.dispatch('status/registerDeviceId', { id: output.id });
      }
    });

    keyboard();
  }
}

const application = new Application();

export default application;