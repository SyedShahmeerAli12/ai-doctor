class AudioProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this._buf = [];
    this._size = 4096; // accumulate ~85ms at 48kHz before sending
  }

  process(inputs) {
    const ch = inputs[0]?.[0];
    if (!ch) return true;
    for (let i = 0; i < ch.length; i++) this._buf.push(ch[i]);
    if (this._buf.length >= this._size) {
      const pcm = new Int16Array(this._buf.length);
      for (let i = 0; i < this._buf.length; i++)
        pcm[i] = Math.max(-32768, Math.min(32767, Math.round(this._buf[i] * 32767)));
      this.port.postMessage(pcm, [pcm.buffer]);
      this._buf = [];
    }
    return true;
  }
}
registerProcessor("audio-processor", AudioProcessor);
