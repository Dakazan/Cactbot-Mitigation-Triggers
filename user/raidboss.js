'use strict';

// Rename this file to `raidboss.js` and edit it to change the raidboss ui.
// This file is Javascript.  Anything after "//" on a line is a comment.
// If you edit this file, remember to reload ACT or click the "Reload overlay"
// button on the raidboss CactbotOverlay.
// If there are errors in this file, they will appear in the OverlayPlugin.dll
// log window in ACT.

Options.InfoSound = '../../resources/sounds/material-sounds/notification_simple-01.ogg';
Options.AlertSound = '../../resources/sounds/material-sounds/notification_simple-01.ogg';
Options.AlarmSound = '../../resources/sounds/material-sounds/alert_simple.ogg';
Options.LongSound = '../../resources/sounds/BigWigs/Long.ogg';
Options.PullSound = '../../resources/sounds/PowerAuras/sonar.ogg';
Options.SpokenAlertsEnabled = false;

// An array of user-defined triggers, in the format defined in the readme:
// https://github.com/quisquous/cactbot/tree/master/ui/raidboss/data/triggers
/* 
      GroupSpeechAlert: boolean, turn on or off group tts texts
      SpeechAlert: boolean, turn on or off tts texts
      SoundAlert: boolean, turn on or off sounds
      TextAlert: boolean, turn on or off on screen text
      AlarmText: function, the string to show as alarm text
      AlertText: function, the string to show as alert text
      InfoText: function, the string to show as info text
      TTSText: function, the string to play as tts text
      GroupTTSText: function, the string to play for group tts text
      SoundOverride: function, the path to the sound to play for this trigger
      VolumeOverride: function, 0-1 value for how loud to play the sound at
*/

Options.Triggers = [
  { 
    zoneRegex: /.*/,
    SpeechAlert: true,
    triggers: [
      {
        id: 'General Ready Check',
        netRegex: NetRegexes.gameLog({ line: '(?:\\y{Name} has initiated|You have commenced) a ready check\..*?', capture: false }),
        netRegexDe: NetRegexes.gameLog({ line: '(?:\\y{Name} hat|Du hast) eine Bereitschaftsanfrage gestellt\..*?', capture: false }),
        netRegexFr: NetRegexes.gameLog({ line: 'Un appel de préparation a été lancé par \y{Name}\..*?', capture: false }),
        netRegexJa: NetRegexes.gameLog({ line: '(?:\\y{Name}が)?レディチェックを開始しました。.*?', capture: false }),
        netRegexCn: NetRegexes.gameLog({ line: '\\y{Name}?发起了准备确认.*?', capture: false }),
        netRegexKo: NetRegexes.gameLog({ line: '\\y{Name} 님이 준비 확인을 시작했습니다\.|준비 확인을 시작합니다\..*?', capture: false }),
        sound: '../../resources/sounds/material-sounds/notification_decorative-01.ogg',
        soundVolume: 0.6,
      },
      {
        SpeechAlert: true,
        id: 'General Addle',
        regex: Regexes.ability({ ability: 'Addle' }),
        condition: function(data, matches) {
        if (matches.source !== data.me && !data.party.inAlliance(matches.source))
          return false;
        return data.role;
        },
        infoText: function(data, matches) {
          let name = data.ShortName(matches.source);
          return {
            en: 'Addle: ' + name,
          };
        },
      },
      {
        id: 'General Shield Samba',
        regex: Regexes.ability({ ability: 'Shield Samba' }),
        condition: function(data, matches) {
        if (matches.source !== data.me && !data.party.inAlliance(matches.source))
          return false;
        return data.role;
        },
        infoText: function(data, matches) {
          let name = data.ShortName(matches.source);
          if (matches.target == data.me) {
            return {
              en: 'Samba: ' + data.ShortName(matches.source),
            };
          }
        },
      },
      {
        id: 'General Tactician',
        regex: Regexes.ability({ ability: 'Tactician' }),
        condition: function(data, matches) {
        if (matches.source !== data.me && !data.party.inAlliance(matches.source))
          return false;
        return data.role;
        },
        infoText: function(data, matches) {
          let name = data.ShortName(matches.source);
          if (matches.target == data.me) {
            return {
              en: 'Tactician: ' + data.ShortName(matches.source),
            };
          }
        },
      },
      {
        id: 'General Reprisal',
        regex: Regexes.ability({ ability: 'Reprisal' }),
        condition: function(data, matches) {
        if (matches.source !== data.me && !data.party.inAlliance(matches.source))
          return false;
        return data.role;
        },
        infoText: function(data, matches) {
          let name = data.ShortName(matches.source);
          return {
            en: 'Reprisal: ' + name,
          };
        },
      },
      {
        id: 'General Feint',
        regex: Regexes.ability({ ability: 'Feint' }),
        condition: function(data, matches) {
        if (matches.source !== data.me && !data.party.inAlliance(matches.source))
          return false;
        return data.role;
        },
        infoText: function(data, matches) {
          let name = data.ShortName(matches.source);
          return {
            en: 'Feint: ' + name,
          };
        },
      },
      {
        id: 'General Troubadour',
        regex: Regexes.ability({ id: '1CED' }),
        condition: function(data, matches) {
        if (matches.source !== data.me && !data.party.inAlliance(matches.source))
          return false;
        return data.role;
        },
        infoText: function(data, matches) {
          let name = data.ShortName(matches.source);
          if (matches.target == data.me) {
            return {
              en: 'Troubadour: ' + data.ShortName(matches.source),
            };
          }
        },
      },
      {
        id: 'General Temperance',
        regex: Regexes.ability({ ability: 'Temperance' }),
        condition: function(data, matches) {
        if (matches.source !== data.me && !data.party.inAlliance(matches.source))
          return false;
        return data.role;
        },
        infoText: function(data, matches) {
          let name = data.ShortName(matches.source);
          return {
            en: 'Temperance: ' + name,
          };
        },
      },
      {
        id: 'General Fey Illumination',
        regex: Regexes.ability({ id: '409A' }),
        condition: function(data, matches) {
        if (matches.source !== data.me && !data.party.inAlliance(matches.source))
          return false;
        return data.role;
        },
        infoText: function(data, matches) {
          let name = data.ShortName(matches.source);
          return {
            en: 'Fey: ' + name,
          };
        },
      },
      {
        id: 'General Heart of Light',
        regex: Regexes.ability({ id: '4533' }),
        condition: function(data, matches) {
        if (matches.source !== data.me && !data.party.inAlliance(matches.source))
          return false;
        return data.role;
        },
        infoText: function(data, matches) {
          let name = data.ShortName(matches.source);
          if (matches.target == data.me) {
            return {
              en: 'Heart of Light: ' + data.ShortName(matches.source),
            };
          }
        },
      },
      {
        id: 'General Dark Missionary',
        regex: Regexes.ability({ ability: 'Dark Missionary' }),  
        condition: function(data, matches) {
        if (matches.source !== data.me && !data.party.inAlliance(matches.source))
          return false;
        return data.role;
        },
        infoText: function(data, matches) {
          let name = data.ShortName(matches.source);
          if (matches.target == data.me) {
            return {
              en: 'Dark Missionary: ' + data.ShortName(matches.source),
            };
          }
        },
      },
            {
        id: 'General Shake It Off',
        regex: Regexes.ability({ ability: 'Shake It Off' }),  
        condition: function(data, matches) {
        if (matches.source !== data.me && !data.party.inAlliance(matches.source))
          return false;
        return data.role;
        },
        infoText: function(data, matches) {
          let name = data.ShortName(matches.source);
          if (matches.target == data.me) {
            return {
              en: 'Shake: ' + data.ShortName(matches.source),
            };
          }
        },
      },
    ],
  },
];