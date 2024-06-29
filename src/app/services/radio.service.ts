import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RadioService {

  private radioStations: any = [
    { name: 'Radio Luanda', station: '99.9 FM', country: 'Angola', url: 'https://paineldj5.com.br:20089/stream' },
    { name: 'Radio RDP AFRICA', station: '', country: 'Angola', url: 'https://radios.vpn.sapo.pt/CV/radio12.mp3' },
    { name: 'Ngola Yetu', station: '', country: 'Angola', url: 'https://radios.vpn.sapo.pt/AO/radio12.mp3' },
    { name: 'Radio Escola', station: '88.5 FM', country: 'Angola', url: 'https://radios.vpn.sapo.pt/AO/radio1.mp3' },
    { name: 'Radio Mais', station: '91.3 FM', country: 'Angola', url: 'https://radios.vpn.sapo.pt/AO/radio10.mp3' },
    { name: 'Radio Romantica', station: '97.9 FM', country: 'Angola', url: 'https://radios.vpn.sapo.pt/AO/radio4.mp3' },
    { name: 'Radio FM STEREO', station: '96.5 FM', country: 'Angola', url: 'https://radios.vpn.sapo.pt/AO/radio7.mp3' },
    { name: 'Radio UNIA', station: '92.3 FM', country: 'Angola', url: 'https://radios.vpn.sapo.pt/AO/radio2.mp3' },
    { name: 'Radio Sem Anestesia', station: '', country: 'Angola', url: 'https://radios.vpn.sapo.pt/AO/radio19.mp3' },
    { name: 'Radio Cazenga', station: '', country: 'Angola', url: 'https://radios.vpn.sapo.pt/AO/radio13.mp3' },
    { name: 'Radio LAC', station: '95.5 FM', country: 'Angola', url: 'https://radios.vpn.sapo.pt/AO/radio14.mp3' },
    { name: 'Radio MFM', station: '91.7 FM', country: 'Angola', url: 'https://stream.zenolive.com/utfkkxfawp8uv' },
    { name: 'Radio Kairós', station: '98.4 FM', country: 'Angola', url: 'https://radios.vpn.sapo.pt/AO/radio9.mp3' },
    { name: 'Radio 5', station: '94.5 FM', country: 'Angola', url: 'https://radios.vpn.sapo.pt/AO/radio5.mp3' },
    { name: 'Radio Viana', station: '', country: 'Angola', url: 'https://radios.vpn.sapo.pt/AO/radio16.mp3'},
    { name: 'Radio Huambo', station: '91.6 FM', country: 'Angola', url: 'https://paineldj.com.br:20142/live' },
    { name: 'Radio RCV', station: '', country: 'Cabo Verde', url: 'https://radios.vpn.sapo.pt/CV/radio7.mp3' },
    { name: 'Capital FM',  station: '', country: 'Reino Unido', url: 'https://media-ice.musicradio.com/CapitalMP3' },
    { name: 'Heart FM', station: '', country: 'Reino Unido', url: 'https://media-ice.musicradio.com/HeartUKMP3' },
    { name: 'KEXP', station: '', country: 'USA', url: 'https://live-mp3-128.kexp.org/kexp128.mp3' },
    { name: 'WNYC-FM', station: '', country: 'USA', url: 'https://fm939.wnyc.org/wnycfm' },
    { name: 'Radio France Internationale', station: '', country: 'França', url: 'https://live02.rfi.fr/rfimonde-64.mp3' },
    { name: 'RFI', station: '', country: 'França', url: 'https://radios.vpn.sapo.pt/CV/radio8.mp3' },
    { name: 'RTL', station: '', country: 'França', url: 'https://streaming.radio.rtl.fr/rtl-1-44-128' },
    { name: 'Radio Swiss Pop', station: '', country: 'Suíça', url: 'https://stream.srg-ssr.ch/m/rsp/mp3_128' },
    { name: 'Los 40 Principales', station: '', country: 'Espanha', url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/LOS40.mp3' },
    { name: 'NPO Radio 1', station: '', country: 'Holanda', url: 'https://icecast.omroep.nl/radio1-bb-mp3' },
    { name: 'Qmusic', station: '', country: 'Holanda', url: 'https://icecast-qmusicnl-cdp.triple-it.nl/Qmusic_nl_live_96.mp3' },
    { name: 'Triple J', station: '', country: 'Australia', url: 'https://live-radio01.mediahubaustralia.com/2TJW/mp3/' },
    { name: 'NRK P1', station: '', country: 'Noruega', url: 'https://lyd.nrk.no/nrk_radio_p1_ostlandssendingen_mp3_h' }
  ];

  getRadioStations(): any[] {
    return this.radioStations;
  }

}
