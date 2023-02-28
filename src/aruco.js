/*
Copyright (c) 2020 Damiano Falcioni
Copyright (c) 2011 Juan Mellado

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

/*
References:
- "ArUco: a minimal library for Augmented Reality applications based on OpenCv"
  http://www.uco.es/investiga/grupos/ava/node/26
- "js-aruco: a port to JavaScript of the ArUco library"
  https://github.com/jcmellado/js-aruco
*/

var AR = {};
var CV = this.CV || require('./cv').CV;
this.AR = AR;

AR.DICTIONARIES = {
  ARUCO: {
    nBits: 25,
    tau: 3,
    codeList: [0x1084210,0x1084217,0x1084209,0x108420e,0x10842f0,0x10842f7,0x10842e9,0x10842ee,0x1084130,0x1084137,0x1084129,0x108412e,0x10841d0,0x10841d7,0x10841c9,0x10841ce,0x1085e10,0x1085e17,0x1085e09,0x1085e0e,0x1085ef0,0x1085ef7,0x1085ee9,0x1085eee,0x1085d30,0x1085d37,0x1085d29,0x1085d2e,0x1085dd0,0x1085dd7,0x1085dc9,0x1085dce,0x1082610,0x1082617,0x1082609,0x108260e,0x10826f0,0x10826f7,0x10826e9,0x10826ee,0x1082530,0x1082537,0x1082529,0x108252e,0x10825d0,0x10825d7,0x10825c9,0x10825ce,0x1083a10,0x1083a17,0x1083a09,0x1083a0e,0x1083af0,0x1083af7,0x1083ae9,0x1083aee,0x1083930,0x1083937,0x1083929,0x108392e,0x10839d0,0x10839d7,0x10839c9,0x10839ce,0x10bc210,0x10bc217,0x10bc209,0x10bc20e,0x10bc2f0,0x10bc2f7,0x10bc2e9,0x10bc2ee,0x10bc130,0x10bc137,0x10bc129,0x10bc12e,0x10bc1d0,0x10bc1d7,0x10bc1c9,0x10bc1ce,0x10bde10,0x10bde17,0x10bde09,0x10bde0e,0x10bdef0,0x10bdef7,0x10bdee9,0x10bdeee,0x10bdd30,0x10bdd37,0x10bdd29,0x10bdd2e,0x10bddd0,0x10bddd7,0x10bddc9,0x10bddce,0x10ba610,0x10ba617,0x10ba609,0x10ba60e,0x10ba6f0,0x10ba6f7,0x10ba6e9,0x10ba6ee,0x10ba530,0x10ba537,0x10ba529,0x10ba52e,0x10ba5d0,0x10ba5d7,0x10ba5c9,0x10ba5ce,0x10bba10,0x10bba17,0x10bba09,0x10bba0e,0x10bbaf0,0x10bbaf7,0x10bbae9,0x10bbaee,0x10bb930,0x10bb937,0x10bb929,0x10bb92e,0x10bb9d0,0x10bb9d7,0x10bb9c9,0x10bb9ce,0x104c210,0x104c217,0x104c209,0x104c20e,0x104c2f0,0x104c2f7,0x104c2e9,0x104c2ee,0x104c130,0x104c137,0x104c129,0x104c12e,0x104c1d0,0x104c1d7,0x104c1c9,0x104c1ce,0x104de10,0x104de17,0x104de09,0x104de0e,0x104def0,0x104def7,0x104dee9,0x104deee,0x104dd30,0x104dd37,0x104dd29,0x104dd2e,0x104ddd0,0x104ddd7,0x104ddc9,0x104ddce,0x104a610,0x104a617,0x104a609,0x104a60e,0x104a6f0,0x104a6f7,0x104a6e9,0x104a6ee,0x104a530,0x104a537,0x104a529,0x104a52e,0x104a5d0,0x104a5d7,0x104a5c9,0x104a5ce,0x104ba10,0x104ba17,0x104ba09,0x104ba0e,0x104baf0,0x104baf7,0x104bae9,0x104baee,0x104b930,0x104b937,0x104b929,0x104b92e,0x104b9d0,0x104b9d7,0x104b9c9,0x104b9ce,0x1074210,0x1074217,0x1074209,0x107420e,0x10742f0,0x10742f7,0x10742e9,0x10742ee,0x1074130,0x1074137,0x1074129,0x107412e,0x10741d0,0x10741d7,0x10741c9,0x10741ce,0x1075e10,0x1075e17,0x1075e09,0x1075e0e,0x1075ef0,0x1075ef7,0x1075ee9,0x1075eee,0x1075d30,0x1075d37,0x1075d29,0x1075d2e,0x1075dd0,0x1075dd7,0x1075dc9,0x1075dce,0x1072610,0x1072617,0x1072609,0x107260e,0x10726f0,0x10726f7,0x10726e9,0x10726ee,0x1072530,0x1072537,0x1072529,0x107252e,0x10725d0,0x10725d7,0x10725c9,0x10725ce,0x1073a10,0x1073a17,0x1073a09,0x1073a0e,0x1073af0,0x1073af7,0x1073ae9,0x1073aee,0x1073930,0x1073937,0x1073929,0x107392e,0x10739d0,0x10739d7,0x10739c9,0x10739ce,0x1784210,0x1784217,0x1784209,0x178420e,0x17842f0,0x17842f7,0x17842e9,0x17842ee,0x1784130,0x1784137,0x1784129,0x178412e,0x17841d0,0x17841d7,0x17841c9,0x17841ce,0x1785e10,0x1785e17,0x1785e09,0x1785e0e,0x1785ef0,0x1785ef7,0x1785ee9,0x1785eee,0x1785d30,0x1785d37,0x1785d29,0x1785d2e,0x1785dd0,0x1785dd7,0x1785dc9,0x1785dce,0x1782610,0x1782617,0x1782609,0x178260e,0x17826f0,0x17826f7,0x17826e9,0x17826ee,0x1782530,0x1782537,0x1782529,0x178252e,0x17825d0,0x17825d7,0x17825c9,0x17825ce,0x1783a10,0x1783a17,0x1783a09,0x1783a0e,0x1783af0,0x1783af7,0x1783ae9,0x1783aee,0x1783930,0x1783937,0x1783929,0x178392e,0x17839d0,0x17839d7,0x17839c9,0x17839ce,0x17bc210,0x17bc217,0x17bc209,0x17bc20e,0x17bc2f0,0x17bc2f7,0x17bc2e9,0x17bc2ee,0x17bc130,0x17bc137,0x17bc129,0x17bc12e,0x17bc1d0,0x17bc1d7,0x17bc1c9,0x17bc1ce,0x17bde10,0x17bde17,0x17bde09,0x17bde0e,0x17bdef0,0x17bdef7,0x17bdee9,0x17bdeee,0x17bdd30,0x17bdd37,0x17bdd29,0x17bdd2e,0x17bddd0,0x17bddd7,0x17bddc9,0x17bddce,0x17ba610,0x17ba617,0x17ba609,0x17ba60e,0x17ba6f0,0x17ba6f7,0x17ba6e9,0x17ba6ee,0x17ba530,0x17ba537,0x17ba529,0x17ba52e,0x17ba5d0,0x17ba5d7,0x17ba5c9,0x17ba5ce,0x17bba10,0x17bba17,0x17bba09,0x17bba0e,0x17bbaf0,0x17bbaf7,0x17bbae9,0x17bbaee,0x17bb930,0x17bb937,0x17bb929,0x17bb92e,0x17bb9d0,0x17bb9d7,0x17bb9c9,0x17bb9ce,0x174c210,0x174c217,0x174c209,0x174c20e,0x174c2f0,0x174c2f7,0x174c2e9,0x174c2ee,0x174c130,0x174c137,0x174c129,0x174c12e,0x174c1d0,0x174c1d7,0x174c1c9,0x174c1ce,0x174de10,0x174de17,0x174de09,0x174de0e,0x174def0,0x174def7,0x174dee9,0x174deee,0x174dd30,0x174dd37,0x174dd29,0x174dd2e,0x174ddd0,0x174ddd7,0x174ddc9,0x174ddce,0x174a610,0x174a617,0x174a609,0x174a60e,0x174a6f0,0x174a6f7,0x174a6e9,0x174a6ee,0x174a530,0x174a537,0x174a529,0x174a52e,0x174a5d0,0x174a5d7,0x174a5c9,0x174a5ce,0x174ba10,0x174ba17,0x174ba09,0x174ba0e,0x174baf0,0x174baf7,0x174bae9,0x174baee,0x174b930,0x174b937,0x174b929,0x174b92e,0x174b9d0,0x174b9d7,0x174b9c9,0x174b9ce,0x1774210,0x1774217,0x1774209,0x177420e,0x17742f0,0x17742f7,0x17742e9,0x17742ee,0x1774130,0x1774137,0x1774129,0x177412e,0x17741d0,0x17741d7,0x17741c9,0x17741ce,0x1775e10,0x1775e17,0x1775e09,0x1775e0e,0x1775ef0,0x1775ef7,0x1775ee9,0x1775eee,0x1775d30,0x1775d37,0x1775d29,0x1775d2e,0x1775dd0,0x1775dd7,0x1775dc9,0x1775dce,0x1772610,0x1772617,0x1772609,0x177260e,0x17726f0,0x17726f7,0x17726e9,0x17726ee,0x1772530,0x1772537,0x1772529,0x177252e,0x17725d0,0x17725d7,0x17725c9,0x17725ce,0x1773a10,0x1773a17,0x1773a09,0x1773a0e,0x1773af0,0x1773af7,0x1773ae9,0x1773aee,0x1773930,0x1773937,0x1773929,0x177392e,0x17739d0,0x17739d7,0x17739c9,0x17739ce,0x984210,0x984217,0x984209,0x98420e,0x9842f0,0x9842f7,0x9842e9,0x9842ee,0x984130,0x984137,0x984129,0x98412e,0x9841d0,0x9841d7,0x9841c9,0x9841ce,0x985e10,0x985e17,0x985e09,0x985e0e,0x985ef0,0x985ef7,0x985ee9,0x985eee,0x985d30,0x985d37,0x985d29,0x985d2e,0x985dd0,0x985dd7,0x985dc9,0x985dce,0x982610,0x982617,0x982609,0x98260e,0x9826f0,0x9826f7,0x9826e9,0x9826ee,0x982530,0x982537,0x982529,0x98252e,0x9825d0,0x9825d7,0x9825c9,0x9825ce,0x983a10,0x983a17,0x983a09,0x983a0e,0x983af0,0x983af7,0x983ae9,0x983aee,0x983930,0x983937,0x983929,0x98392e,0x9839d0,0x9839d7,0x9839c9,0x9839ce,0x9bc210,0x9bc217,0x9bc209,0x9bc20e,0x9bc2f0,0x9bc2f7,0x9bc2e9,0x9bc2ee,0x9bc130,0x9bc137,0x9bc129,0x9bc12e,0x9bc1d0,0x9bc1d7,0x9bc1c9,0x9bc1ce,0x9bde10,0x9bde17,0x9bde09,0x9bde0e,0x9bdef0,0x9bdef7,0x9bdee9,0x9bdeee,0x9bdd30,0x9bdd37,0x9bdd29,0x9bdd2e,0x9bddd0,0x9bddd7,0x9bddc9,0x9bddce,0x9ba610,0x9ba617,0x9ba609,0x9ba60e,0x9ba6f0,0x9ba6f7,0x9ba6e9,0x9ba6ee,0x9ba530,0x9ba537,0x9ba529,0x9ba52e,0x9ba5d0,0x9ba5d7,0x9ba5c9,0x9ba5ce,0x9bba10,0x9bba17,0x9bba09,0x9bba0e,0x9bbaf0,0x9bbaf7,0x9bbae9,0x9bbaee,0x9bb930,0x9bb937,0x9bb929,0x9bb92e,0x9bb9d0,0x9bb9d7,0x9bb9c9,0x9bb9ce,0x94c210,0x94c217,0x94c209,0x94c20e,0x94c2f0,0x94c2f7,0x94c2e9,0x94c2ee,0x94c130,0x94c137,0x94c129,0x94c12e,0x94c1d0,0x94c1d7,0x94c1c9,0x94c1ce,0x94de10,0x94de17,0x94de09,0x94de0e,0x94def0,0x94def7,0x94dee9,0x94deee,0x94dd30,0x94dd37,0x94dd29,0x94dd2e,0x94ddd0,0x94ddd7,0x94ddc9,0x94ddce,0x94a610,0x94a617,0x94a609,0x94a60e,0x94a6f0,0x94a6f7,0x94a6e9,0x94a6ee,0x94a530,0x94a537,0x94a529,0x94a52e,0x94a5d0,0x94a5d7,0x94a5c9,0x94a5ce,0x94ba10,0x94ba17,0x94ba09,0x94ba0e,0x94baf0,0x94baf7,0x94bae9,0x94baee,0x94b930,0x94b937,0x94b929,0x94b92e,0x94b9d0,0x94b9d7,0x94b9c9,0x94b9ce,0x974210,0x974217,0x974209,0x97420e,0x9742f0,0x9742f7,0x9742e9,0x9742ee,0x974130,0x974137,0x974129,0x97412e,0x9741d0,0x9741d7,0x9741c9,0x9741ce,0x975e10,0x975e17,0x975e09,0x975e0e,0x975ef0,0x975ef7,0x975ee9,0x975eee,0x975d30,0x975d37,0x975d29,0x975d2e,0x975dd0,0x975dd7,0x975dc9,0x975dce,0x972610,0x972617,0x972609,0x97260e,0x9726f0,0x9726f7,0x9726e9,0x9726ee,0x972530,0x972537,0x972529,0x97252e,0x9725d0,0x9725d7,0x9725c9,0x9725ce,0x973a10,0x973a17,0x973a09,0x973a0e,0x973af0,0x973af7,0x973ae9,0x973aee,0x973930,0x973937,0x973929,0x97392e,0x9739d0,0x9739d7,0x9739c9,0x9739ce,0xe84210,0xe84217,0xe84209,0xe8420e,0xe842f0,0xe842f7,0xe842e9,0xe842ee,0xe84130,0xe84137,0xe84129,0xe8412e,0xe841d0,0xe841d7,0xe841c9,0xe841ce,0xe85e10,0xe85e17,0xe85e09,0xe85e0e,0xe85ef0,0xe85ef7,0xe85ee9,0xe85eee,0xe85d30,0xe85d37,0xe85d29,0xe85d2e,0xe85dd0,0xe85dd7,0xe85dc9,0xe85dce,0xe82610,0xe82617,0xe82609,0xe8260e,0xe826f0,0xe826f7,0xe826e9,0xe826ee,0xe82530,0xe82537,0xe82529,0xe8252e,0xe825d0,0xe825d7,0xe825c9,0xe825ce,0xe83a10,0xe83a17,0xe83a09,0xe83a0e,0xe83af0,0xe83af7,0xe83ae9,0xe83aee,0xe83930,0xe83937,0xe83929,0xe8392e,0xe839d0,0xe839d7,0xe839c9,0xe839ce,0xebc210,0xebc217,0xebc209,0xebc20e,0xebc2f0,0xebc2f7,0xebc2e9,0xebc2ee,0xebc130,0xebc137,0xebc129,0xebc12e,0xebc1d0,0xebc1d7,0xebc1c9,0xebc1ce,0xebde10,0xebde17,0xebde09,0xebde0e,0xebdef0,0xebdef7,0xebdee9,0xebdeee,0xebdd30,0xebdd37,0xebdd29,0xebdd2e,0xebddd0,0xebddd7,0xebddc9,0xebddce,0xeba610,0xeba617,0xeba609,0xeba60e,0xeba6f0,0xeba6f7,0xeba6e9,0xeba6ee,0xeba530,0xeba537,0xeba529,0xeba52e,0xeba5d0,0xeba5d7,0xeba5c9,0xeba5ce,0xebba10,0xebba17,0xebba09,0xebba0e,0xebbaf0,0xebbaf7,0xebbae9,0xebbaee,0xebb930,0xebb937,0xebb929,0xebb92e,0xebb9d0,0xebb9d7,0xebb9c9,0xebb9ce,0xe4c210,0xe4c217,0xe4c209,0xe4c20e,0xe4c2f0,0xe4c2f7,0xe4c2e9,0xe4c2ee,0xe4c130,0xe4c137,0xe4c129,0xe4c12e,0xe4c1d0,0xe4c1d7,0xe4c1c9,0xe4c1ce,0xe4de10,0xe4de17,0xe4de09,0xe4de0e,0xe4def0,0xe4def7,0xe4dee9,0xe4deee,0xe4dd30,0xe4dd37,0xe4dd29,0xe4dd2e,0xe4ddd0,0xe4ddd7,0xe4ddc9,0xe4ddce,0xe4a610,0xe4a617,0xe4a609,0xe4a60e,0xe4a6f0,0xe4a6f7,0xe4a6e9,0xe4a6ee,0xe4a530,0xe4a537,0xe4a529,0xe4a52e,0xe4a5d0,0xe4a5d7,0xe4a5c9,0xe4a5ce,0xe4ba10,0xe4ba17,0xe4ba09,0xe4ba0e,0xe4baf0,0xe4baf7,0xe4bae9,0xe4baee,0xe4b930,0xe4b937,0xe4b929,0xe4b92e,0xe4b9d0,0xe4b9d7,0xe4b9c9,0xe4b9ce,0xe74210,0xe74217,0xe74209,0xe7420e,0xe742f0,0xe742f7,0xe742e9,0xe742ee,0xe74130,0xe74137,0xe74129,0xe7412e,0xe741d0,0xe741d7,0xe741c9,0xe741ce,0xe75e10,0xe75e17,0xe75e09,0xe75e0e,0xe75ef0,0xe75ef7,0xe75ee9,0xe75eee,0xe75d30,0xe75d37,0xe75d29,0xe75d2e,0xe75dd0,0xe75dd7,0xe75dc9,0xe75dce,0xe72610,0xe72617,0xe72609,0xe7260e,0xe726f0,0xe726f7,0xe726e9,0xe726ee,0xe72530,0xe72537,0xe72529,0xe7252e,0xe725d0,0xe725d7,0xe725c9,0xe725ce,0xe73a10,0xe73a17,0xe73a09,0xe73a0e,0xe73af0,0xe73af7,0xe73ae9,0xe73aee,0xe73930,0xe73937,0xe73929,0xe7392e,0xe739d0,0xe739d7,0xe739c9]
  },
  ARUCO_MIP_36h12: {
    nBits: 36,
    tau: 12,
    codeList: [0xd2b63a09d,0x6001134e5,0x1206fbe72,0xff8ad6cb4,0x85da9bc49,0xb461afe9c,0x6db51fe13,0x5248c541f,0x8f34503,0x8ea462ece,0xeac2be76d,0x1af615c44,0xb48a49f27,0x2e4e1283b,0x78b1f2fa8,0x27d34f57e,0x89222fff1,0x4c1669406,0xbf49b3511,0xdc191cd5d,0x11d7c3f85,0x16a130e35,0xe29f27eff,0x428d8ae0c,0x90d548477,0x2319cbc93,0xc3b0c3dfc,0x424bccc9,0x2a081d630,0x762743d96,0xd0645bf19,0xf38d7fd60,0xc6cbf9a10,0x3c1be7c65,0x276f75e63,0x4490a3f63,0xda60acd52,0x3cc68df59,0xab46f9dae,0x88d533d78,0xb6d62ec21,0xb3c02b646,0x22e56d408,0xac5f5770a,0xaaa993f66,0x4caa07c8d,0x5c9b4f7b0,0xaa9ef0e05,0x705c5750,0xac81f545e,0x735b91e74,0x8cc35cee4,0xe44694d04,0xb5e121de0,0x261017d0f,0xf1d439eb5,0xa1a33ac96,0x174c62c02,0x1ee27f716,0x8b1c5ece9,0x6a05b0c6a,0xd0568dfc,0x192d25e5f,0x1adbeccc8,0xcfec87f00,0xd0b9dde7a,0x88dcef81e,0x445681cb9,0xdbb2ffc83,0xa48d96df1,0xb72cc2e7d,0xc295b53f,0xf49832704,0x9968edc29,0x9e4e1af85,0x8683e2d1b,0x810b45c04,0x6ac44bfe2,0x645346615,0x3990bd598,0x1c9ed0f6a,0xc26729d65,0x83993f795,0x3ac05ac5d,0x357adff3b,0xd5c05565,0x2f547ef44,0x86c115041,0x640fd9e5f,0xce08bbcf7,0x109bb343e,0xc21435c92,0x35b4dfce4,0x459752cf2,0xec915b82c,0x51881eed0,0x2dda7dc97,0x2e0142144,0x42e890f99,0x9a8856527,0x8e80d9d80,0x891cbcf34,0x25dd82410,0x239551d34,0x8fe8f0c70,0x94106a970,0x82609b40c,0xfc9caf36,0x688181d11,0x718613c08,0xf1ab7629,0xa357bfc18,0x4c03b7a46,0x204dedce6,0xad6300d37,0x84cc4cd09,0x42160e5c4,0x87d2adfa8,0x7850e7749,0x4e750fc7c,0xbf2e5dfda,0xd88324da5,0x234b52f80,0x378204514,0xabdf2ad53,0x365e78ef9,0x49caa6ca2,0x3c39ddf3,0xc68c5385d,0x5bfcbbf67,0x623241e21,0xabc90d5cc,0x388c6fe85,0xda0e2d62d,0x10855dfe9,0x4d46efd6b,0x76ea12d61,0x9db377d3d,0xeed0efa71,0xe6ec3ae2f,0x441faee83,0xba19c8ff5,0x313035eab,0x6ce8f7625,0x880dab58d,0x8d3409e0d,0x2be92ee21,0xd60302c6c,0x469ffc724,0x87eebeed3,0x42587ef7a,0x7a8cc4e52,0x76a437650,0x999e41ef4,0x7d0969e42,0xc02baf46b,0x9259f3e47,0x2116a1dc0,0x9f2de4d84,0xeffac29,0x7b371ff8c,0x668339da9,0xd010aee3f,0x1cd00b4c0,0x95070fc3b,0xf84c9a770,0x38f863d76,0x3646ff045,0xce1b96412,0x7a5d45da8,0x14e00ef6c,0x5e95abfd8,0xb2e9cb729,0x36c47dd7,0xb8ee97c6b,0xe9e8f657,0xd4ad2ef1a,0x8811c7f32,0x47bde7c31,0x3adadfb64,0x6e5b28574,0x33e67cd91,0x2ab9fdd2d,0x8afa67f2b,0xe6a28fc5e,0x72049cdbd,0xae65dac12,0x1251a4526,0x1089ab841,0xe2f096ee0,0xb0caee573,0xfd6677e86,0x444b3f518,0xbe8b3a56a,0x680a75cfc,0xac02baea8,0x97d815e1c,0x1d4386e08,0x1a14f5b0e,0xe658a8d81,0xa3868efa7,0x3668a9673,0xe8fc53d85,0x2e2b7edd5,0x8b2470f13,0xf69795f32,0x4589ffc8e,0x2e2080c9c,0x64265f7d,0x3d714dd10,0x1692c6ef1,0x3e67f2f49,0x5041dad63,0x1a1503415,0x64c18c742,0xa72eec35,0x1f0f9dc60,0xa9559bc67,0xf32911d0d,0x21c0d4ffc,0xe01cef5b0,0x4e23a3520,0xaa4f04e49,0xe1c4fcc43,0x208e8f6e8,0x8486774a5,0x9e98c7558,0x2c59fb7dc,0x9446a4613,0x8292dcc2e,0x4d61631,0xd05527809,0xa0163852d,0x8f657f639,0xcca6c3e37,0xcb136bc7a,0xfc5a83e53,0x9aa44fc30,0xbdec1bd3c,0xe020b9f7c,0x4b8f35fb0,0xb8165f637,0x33dc88d69,0x10a2f7e4d,0xc8cb5ff53,0xde259ff6b,0x46d070dd4,0x32d3b9741,0x7075f1c04,0x4d58dbea0]
  },
  ARUCO_5X5_1000: {
    nBits: 25,
    tau: null,
    codeList: [[162,217,94,0],[14,3,115,0],[215,135,110,1],[129,202,251,1],[215,90,146,0],[234,4,22,1],[105,235,246,0],[113,10,53,1],[134,176,153,0],[152,159,210,1],[158,119,1,1],[209,109,96,0],[243,21,136,1],[47,56,179,0],[254,126,84,0],[40,241,191,1],[75,211,172,0],[95,81,55,1],[123,38,226,0],[131,14,244,0],[150,237,58,1],[168,114,32,0],[181,134,80,1],[93,9,111,0],[206,104,17,1],[210,204,185,0],[225,231,69,1],[17,33,35,0],[29,203,57,0],[18,17,29,1],[19,155,183,0],[27,68,57,1],[32,104,103,0],[37,85,100,0],[35,33,221,0],[61,55,245,0],[76,197,86,0],[65,104,128,1],[77,86,142,1],[67,30,57,0],[86,148,18,1],[82,151,207,0],[108,36,251,1],[97,132,236,1],[109,63,24,1],[116,177,61,0],[116,220,203,1],[124,164,3,0],[122,200,146,1],[123,91,235,1],[141,172,114,0],[141,105,60,1],[143,28,5,1],[139,74,34,1],[151,253,165,0],[172,101,198,1],[172,195,248,0],[161,23,239,1],[167,9,19,1],[171,111,145,0],[185,237,248,1],[178,100,158,0],[190,93,195,0],[196,5,67,1],[200,163,238,1],[194,117,197,0],[198,194,214,1],[217,102,212,1],[221,94,185,1],[244,234,25,0],[243,178,148,0],[122,186,5,0],[216,141,41,1],[12,103,50,1],[21,89,12,1],[76,116,192,1],[84,3,14,0],[160,208,172,0],[194,152,166,0],[203,104,150,0],[253,105,209,0],[4,145,90,1],[12,222,112,0],[5,170,62,0],[1,99,183,1],[9,145,68,1],[9,105,83,1],[6,37,161,1],[3,61,226,1],[7,213,6,1],[15,143,170,0],[28,116,60,1],[25,29,145,1],[22,27,35,1],[22,210,141,1],[23,78,198,1],[19,226,177,0],[31,126,250,1],[41,15,112,0],[34,71,126,1],[42,23,192,1],[42,251,100,1],[35,240,4,0],[39,205,252,0],[35,106,172,0],[47,123,47,0],[52,144,196,0],[48,9,214,1],[52,94,16,1],[57,82,232,0],[50,0,113,0],[54,231,29,0],[68,138,4,1],[68,236,254,1],[69,31,114,1],[69,74,149,0],[70,19,190,1],[78,131,9,0],[71,114,153,1],[79,130,125,1],[92,55,141,1],[88,253,119,0],[81,183,248,0],[89,58,251,0],[90,153,153,0],[83,1,240,1],[83,204,103,1],[83,110,1,0],[91,37,175,1],[95,213,204,1],[101,102,66,1],[101,199,175,0],[102,55,81,0],[103,12,197,1],[112,150,93,1],[124,99,128,1],[121,171,169,0],[114,61,70,0],[115,229,178,1],[132,38,140,0],[137,241,1,0],[134,174,233,1],[138,35,249,1],[148,53,113,1],[156,69,27,0],[149,31,164,1],[150,141,144,0],[151,38,183,0],[155,55,103,0],[155,198,224,1],[160,154,110,1],[164,82,134,1],[168,176,133,1],[173,155,66,0],[175,240,88,1],[176,46,99,1],[176,15,24,0],[188,234,178,1],[190,196,76,1],[179,130,250,0],[179,88,60,1],[191,69,238,0],[191,86,51,1],[196,58,240,0],[204,233,131,0],[197,51,0,1],[205,34,99,1],[198,8,138,1],[198,148,63,0],[202,238,132,1],[207,167,18,1],[203,97,226,1],[208,2,233,0],[220,183,70,0],[217,139,132,1],[217,206,178,0],[210,153,64,1],[210,209,23,0],[222,90,110,1],[218,71,66,1],[219,60,16,0],[219,143,201,0],[232,24,227,1],[229,28,111,0],[225,174,56,1],[237,185,123,1],[233,224,50,0],[235,93,12,0],[239,249,157,0],[248,17,1,0],[248,7,211,0],[246,2,32,1],[246,27,95,1],[254,181,237,0],[250,51,56,1],[250,74,193,1],[247,47,112,1],[247,234,252,1],[255,24,148,1],[251,163,94,0],[104,184,47,0],[153,15,11,1],[153,216,38,1],[228,95,14,1],[29,16,110,1],[42,193,48,1],[52,65,99,1],[55,192,116,1],[63,53,203,1],[86,160,76,0],[87,56,57,1],[102,152,184,0],[115,165,23,0],[127,44,253,1],[139,71,233,0],[165,195,151,0],[169,169,235,0],[181,25,183,0],[178,218,153,1],[196,193,244,0],[202,185,30,0],[216,111,163,1],[223,141,142,0],[229,102,143,1],[237,71,26,1],[240,103,134,1],[4,41,238,1],[0,35,71,1],[0,162,251,0],[4,200,206,0],[0,210,225,1],[12,10,15,0],[8,139,198,0],[12,134,91,0],[5,129,253,0],[1,113,30,0],[1,194,21,1],[1,231,113,0],[9,41,191,0],[13,16,27,1],[13,5,24,0],[13,237,47,1],[13,102,222,0],[9,242,118,0],[2,208,130,1],[2,98,201,0],[6,243,169,0],[6,239,35,0],[14,62,18,0],[10,154,221,1],[10,97,109,1],[10,255,81,0],[7,230,114,1],[11,154,1,0],[15,208,142,0],[15,73,147,0],[15,247,123,0],[16,158,96,1],[16,81,237,0],[20,122,222,1],[28,133,62,1],[28,35,104,0],[24,199,52,0],[21,251,130,1],[17,78,147,1],[25,160,234,1],[18,24,76,0],[18,163,174,0],[30,172,60,0],[30,201,108,0],[30,233,163,1],[26,118,216,0],[19,182,7,1],[23,70,188,0],[31,21,121,0],[27,35,125,0],[27,191,146,0],[31,150,154,1],[27,72,235,0],[32,12,253,0],[32,23,86,0],[40,1,153,1],[44,50,55,1],[37,140,230,0],[33,30,140,0],[45,125,105,0],[41,192,73,0],[38,177,32,0],[38,128,28,1],[34,180,26,0],[38,42,68,1],[38,171,89,0],[38,201,132,0],[42,48,98,1],[46,50,173,0],[35,63,1,1],[35,131,80,0],[39,100,46,1],[39,212,176,1],[47,186,44,1],[43,38,186,1],[48,11,141,0],[52,38,146,1],[48,130,25,0],[48,123,44,1],[60,184,59,1],[60,38,15,1],[56,233,220,0],[60,192,247,0],[56,247,84,1],[49,5,180,1],[53,184,254,1],[53,178,211,1],[57,155,206,1],[57,109,46,0],[61,224,131,1],[57,244,208,0],[57,255,32,0],[57,199,136,1],[54,15,36,0],[50,30,213,0],[54,191,209,1],[54,70,235,0],[58,45,168,0],[58,147,187,0],[55,149,173,0],[55,4,147,0],[51,160,216,1],[55,67,167,0],[51,250,92,0],[63,131,110,0],[63,107,96,0],[64,225,205,0],[76,144,234,0],[72,154,105,1],[76,190,247,0],[72,235,138,1],[72,211,7,1],[76,90,152,1],[65,36,19,1],[77,11,248,0],[73,91,189,1],[70,141,101,0],[66,181,107,1],[70,92,131,0],[70,244,103,0],[70,121,187,0],[74,163,157,1],[78,65,78,1],[78,75,194,0],[67,137,211,1],[71,170,200,1],[67,59,19,0],[71,74,105,1],[79,22,235,1],[79,69,160,0],[80,145,108,1],[84,16,187,0],[80,90,77,1],[80,114,212,0],[84,234,241,1],[88,9,195,1],[92,89,121,0],[88,107,27,0],[81,52,246,1],[85,169,118,1],[85,151,183,1],[85,72,67,1],[81,203,28,0],[89,103,105,1],[89,87,155,0],[86,160,171,1],[82,76,88,0],[86,87,68,1],[94,1,56,0],[90,1,255,0],[90,53,19,1],[94,29,215,1],[94,146,70,1],[90,108,162,0],[87,57,5,0],[87,185,238,0],[83,27,44,1],[87,134,8,0],[87,179,31,1],[87,175,125,0],[83,240,235,0],[91,30,236,0],[95,6,166,1],[95,46,87,1],[91,89,192,0],[91,221,125,1],[91,78,47,0],[95,111,137,1],[91,99,218,0],[96,32,36,1],[100,167,30,1],[96,84,84,1],[104,166,103,0],[108,235,188,1],[105,70,205,1],[109,243,169,1],[109,94,31,0],[102,32,99,0],[102,219,83,1],[98,215,16,1],[106,165,84,1],[110,46,41,1],[103,54,146,0],[103,196,202,0],[99,83,34,1],[107,59,196,1],[111,22,80,1],[107,88,37,1],[111,99,213,1],[112,192,248,1],[116,215,208,0],[113,43,110,1],[113,121,27,1],[113,66,210,0],[113,99,253,0],[117,254,122,1],[125,152,140,0],[125,185,247,0],[125,19,147,1],[121,71,103,0],[125,223,195,0],[121,239,82,1],[114,0,182,0],[118,68,152,1],[118,122,66,0],[126,11,181,1],[115,58,225,1],[119,139,59,1],[119,93,234,0],[127,76,0,1],[123,117,224,1],[127,226,186,0],[128,176,67,1],[128,188,61,0],[128,50,88,0],[128,92,26,1],[132,251,36,0],[128,127,245,1],[136,45,197,1],[136,153,224,1],[136,25,149,0],[133,29,199,1],[129,187,135,0],[129,225,96,1],[133,126,33,1],[129,242,146,0],[137,61,108,1],[137,100,178,1],[141,212,30,1],[137,94,209,1],[138,4,172,0],[142,200,22,0],[142,242,252,1],[131,11,137,0],[135,43,109,0],[135,69,49,0],[131,108,120,1],[135,238,13,0],[139,177,43,1],[139,145,216,0],[139,89,102,0],[143,229,85,0],[143,243,101,1],[148,26,21,0],[144,225,167,0],[144,71,255,0],[156,188,213,0],[152,146,244,0],[156,83,168,1],[152,195,107,0],[152,114,63,1],[145,19,213,0],[149,191,251,0],[149,69,22,1],[149,238,216,0],[157,214,4,0],[157,98,112,0],[150,175,206,0],[150,186,24,1],[150,217,61,1],[158,33,46,0],[154,185,132,0],[154,129,79,1],[154,59,54,1],[158,195,37,0],[147,149,40,0],[151,50,46,1],[151,211,152,0],[155,157,163,1],[159,28,240,0],[159,51,82,1],[155,250,202,0],[159,250,148,0],[160,60,203,1],[164,168,105,0],[160,179,245,0],[164,106,191,0],[160,91,120,1],[168,104,152,1],[172,205,54,1],[172,220,121,1],[161,73,35,0],[161,67,217,0],[173,176,209,0],[169,155,28,1],[169,138,215,1],[173,84,106,1],[173,235,81,1],[166,29,142,0],[166,92,102,1],[174,188,36,0],[170,171,48,0],[174,204,216,0],[170,237,187,0],[174,227,205,1],[167,54,8,1],[163,236,229,0],[163,193,155,1],[167,250,58,0],[175,165,105,1],[175,200,189,1],[175,239,164,0],[171,103,246,0],[180,28,82,0],[180,63,68,1],[180,240,202,0],[184,24,45,0],[188,191,136,1],[184,142,4,1],[188,120,40,1],[184,200,67,1],[188,243,60,1],[181,19,12,0],[177,63,106,0],[177,101,123,1],[177,203,237,0],[177,194,103,1],[177,90,242,1],[181,238,31,1],[185,144,112,1],[185,163,64,1],[185,120,90,0],[185,247,203,0],[182,5,1,1],[178,255,194,0],[178,123,21,0],[178,110,90,1],[190,181,243,1],[186,167,161,0],[186,114,10,1],[179,48,64,0],[183,181,52,1],[183,105,76,0],[183,197,193,0],[179,87,222,0],[187,84,251,0],[187,202,108,1],[187,251,225,1],[191,246,134,1],[196,45,124,0],[200,28,52,0],[204,67,229,1],[197,53,174,1],[193,146,192,0],[197,35,247,0],[193,159,254,0],[193,84,97,0],[193,87,130,0],[193,199,55,1],[201,140,239,1],[205,240,111,0],[201,95,103,1],[201,119,241,0],[205,226,149,1],[198,191,7,1],[198,191,184,0],[198,219,201,1],[202,49,136,0],[206,222,45,1],[199,120,44,1],[203,171,75,1],[207,67,191,0],[208,174,86,1],[208,115,51,0],[216,20,152,0],[220,96,159,1],[213,117,88,0],[209,224,215,0],[213,251,177,0],[213,218,116,1],[221,60,116,1],[221,151,109,0],[217,27,49,0],[217,98,166,0],[210,171,124,1],[210,197,236,0],[210,202,106,0],[210,107,214,0],[222,155,52,0],[222,146,158,0],[218,96,216,1],[215,57,178,1],[215,95,38,0],[223,1,65,1],[223,121,15,1],[219,247,116,0],[224,67,79,1],[224,198,227,0],[236,56,189,1],[236,81,253,0],[229,141,36,0],[229,5,121,1],[225,78,248,0],[229,87,220,1],[225,247,242,1],[226,133,77,0],[226,24,26,0],[226,43,203,0],[230,236,2,0],[230,98,129,0],[234,38,64,0],[234,224,196,0],[234,114,148,1],[227,17,63,1],[231,11,230,1],[227,100,241,1],[231,250,226,1],[227,219,243,0],[239,135,98,0],[239,93,112,0],[235,102,14,0],[239,74,60,0],[240,178,33,1],[240,175,79,0],[244,159,60,1],[240,245,4,0],[240,242,120,0],[248,52,99,0],[252,219,143,0],[252,254,77,1],[253,176,69,1],[253,51,235,0],[249,196,217,1],[242,35,145,1],[246,210,251,1],[254,239,211,1],[243,176,58,1],[247,138,77,1],[243,143,157,1],[247,242,39,0],[255,189,133,1],[255,38,197,1],[251,224,97,0],[255,220,26,0],[25,248,99,1],[169,93,31,1],[0,184,72,1],[0,236,225,0],[8,97,102,0],[8,244,131,0],[12,248,157,0],[8,192,62,1],[1,57,192,0],[1,40,10,0],[1,190,179,1],[13,128,85,0],[13,175,99,1],[6,181,236,0],[2,153,54,1],[6,182,143,0],[6,125,64,1],[2,114,104,1],[6,203,237,1],[14,15,61,0],[14,213,203,0],[3,125,39,1],[3,233,143,0],[7,250,159,1],[11,76,16,0],[16,185,87,1],[16,22,41,0],[16,98,139,1],[24,157,182,0],[24,109,0,1],[28,118,42,0],[24,95,228,1],[28,66,22,0],[17,60,169,0],[17,152,57,1],[21,58,99,0],[21,18,117,1],[21,222,162,0],[21,106,24,1],[29,209,40,0],[29,113,148,1],[18,57,139,1],[18,5,152,0],[22,2,152,1],[26,52,127,1],[30,220,239,1],[30,112,115,0],[26,67,149,0],[26,126,27,1],[23,173,194,0],[19,25,222,1],[27,168,147,1],[27,147,73,1],[27,208,27,0],[31,66,219,1],[32,185,170,0],[36,196,186,0],[40,173,5,0],[44,35,100,1],[44,14,154,1],[44,81,3,1],[37,197,207,1],[37,200,211,1],[33,119,232,1],[34,141,218,1],[34,10,238,0],[46,134,44,0],[42,182,47,1],[39,60,45,0],[39,157,74,0],[39,155,7,1],[35,87,132,0],[35,78,67,1],[47,171,185,1],[48,176,46,1],[48,40,122,0],[52,253,160,1],[60,214,137,0],[56,126,182,0],[49,0,109,0],[49,23,219,1],[49,167,119,1],[61,128,10,1],[61,226,157,0],[54,106,119,1],[54,199,190,1],[62,187,41,0],[62,104,154,0],[62,95,2,1],[58,86,206,1],[62,95,252,0],[51,185,172,0],[51,84,174,0],[63,25,160,0],[59,173,97,1],[59,112,47,1],[59,235,58,1],[64,83,90,0],[65,152,22,0],[65,143,177,0],[69,217,33,1],[69,235,1,0],[73,157,82,0],[66,56,79,1],[74,166,163,1],[74,197,42,1],[74,200,115,0],[71,180,198,1],[67,147,93,0],[67,120,117,0],[79,58,175,1],[79,135,68,1],[79,135,223,0],[79,196,222,1],[84,31,71,0],[80,31,148,0],[92,145,67,0],[88,189,239,1],[92,221,7,1],[92,102,88,1],[92,219,50,1],[85,69,212,0],[81,68,62,0],[81,231,230,0],[89,11,167,0],[93,186,56,1],[93,166,55,1],[89,249,149,0],[93,255,236,0],[82,157,58,0],[86,58,151,0],[82,99,34,0],[82,203,49,1],[90,139,204,1],[83,33,106,0],[87,245,17,0],[95,220,33,0],[96,140,28,0],[96,162,213,1],[96,222,5,1],[108,76,110,0],[104,82,12,0],[101,59,167,0],[97,170,234,0],[101,113,110,1],[101,124,89,1],[105,131,46,1],[109,196,12,0],[109,210,20,1],[98,150,165,1],[98,117,38,1],[98,100,214,1],[98,91,220,1],[110,51,2,1],[110,90,137,0],[99,209,212,0],[99,75,129,1],[107,56,145,1],[107,122,42,0],[116,56,51,0],[112,6,44,0],[116,170,141,1],[116,76,143,0],[124,183,167,0],[120,3,22,1],[124,199,198,1],[117,182,4,1],[113,254,101,0],[113,79,154,1],[121,32,119,0],[125,121,205,0],[125,67,92,0],[125,127,59,0],[118,85,8,0],[122,152,199,0],[126,19,192,0],[126,94,89,1],[115,36,132,0],[115,46,39,1],[115,139,84,1],[132,4,34,0],[128,232,46,0],[128,237,48,0],[140,53,96,0],[140,120,240,1],[136,194,128,1],[129,26,100,1],[129,38,163,0],[133,154,140,1],[137,19,23,1],[130,9,37,0],[130,183,201,1],[142,185,191,1],[138,159,236,0],[142,228,226,0],[135,32,232,0],[135,205,96,1],[135,71,172,1],[139,10,91,0],[139,92,190,1],[143,213,180,0],[139,118,41,0],[148,51,175,0],[144,85,72,1],[156,62,39,0],[152,151,159,0],[152,88,144,1],[149,182,31,0],[145,64,55,0],[157,179,128,0],[153,65,137,1],[146,173,38,0],[146,101,228,1],[146,111,141,1],[150,94,153,0],[154,11,77,0],[154,221,17,0],[147,246,156,1],[159,52,189,1],[159,80,9,0],[160,153,27,1],[164,15,234,0],[160,15,83,1],[168,2,105,1],[172,27,205,1],[172,135,77,0],[172,118,200,0],[165,68,167,0],[161,244,92,0],[169,157,169,0],[169,135,255,0],[169,71,98,1],[166,129,114,1],[166,249,172,1],[162,196,38,0],[170,53,101,1],[170,168,102,0],[170,200,143,0],[167,110,148,1],[175,4,36,1],[176,65,44,0],[176,208,227,0],[176,237,129,1],[180,231,236,0],[184,160,236,1],[184,188,60,1],[177,102,224,1],[189,49,10,1],[189,63,186,1],[185,190,220,0],[178,58,240,1],[182,207,169,0],[186,35,226,1],[183,36,171,1],[183,41,251,0],[179,174,8,0],[183,86,202,1],[191,168,244,0],[191,148,18,1],[191,122,64,1],[196,133,200,0],[192,14,9,1],[192,112,254,0],[204,116,17,0],[193,8,90,1],[193,47,130,1],[193,35,120,0],[198,52,219,1],[198,164,244,1],[194,228,25,0],[195,29,35,0],[195,242,196,1],[199,95,223,0],[203,101,189,0],[203,199,15,1],[207,246,185,0],[212,84,239,0],[212,251,220,0],[220,232,84,0],[213,177,150,0],[209,159,7,1],[209,93,126,1],[217,164,134,1],[221,9,48,1],[217,180,57,1],[221,171,105,1],[217,203,66,0],[210,33,13,0],[214,73,4,0],[210,216,219,0],[218,63,69,1],[218,125,218,0],[218,211,230,0],[211,51,189,0],[215,225,237,1],[219,197,122,0],[224,128,59,1],[224,207,105,1],[228,71,48,1],[232,29,86,1],[232,243,72,1],[232,254,175,0],[236,231,159,0],[225,60,212,1],[229,204,106,1],[233,175,154,0],[227,0,237,0],[231,177,14,0],[227,192,126,0],[235,140,163,0],[235,159,109,1],[239,65,11,0],[239,194,195,0],[240,168,32,0],[244,25,211,0],[244,133,191,1],[240,106,204,0],[240,123,107,1],[244,251,170,0],[252,198,47,0],[248,111,16,0],[252,127,120,1],[241,171,217,0],[245,81,143,1],[241,248,166,1],[241,86,24,0],[253,132,196,0],[249,141,114,1],[253,15,85,1],[242,156,111,1],[246,136,24,1],[246,7,197,0],[242,65,215,0],[246,241,27,0],[242,230,203,1],[250,213,32,1],[254,67,233,0],[243,251,142,0],[255,187,218,0],[251,201,14,1]]
  },
};

AR.Dictionary = function (dicName) {
  this.codes = {};
  this.codeList = [];
  this.tau = 0;
  this._initialize(dicName);
};

AR.Dictionary.prototype._initialize = function (dicName) {
  this.codes = {};
  this.codeList = [];
  this.tau = 0;
  this.nBits = 0;
  this.markSize = 0;
  this.dicName = dicName;
  var dictionary = AR.DICTIONARIES[dicName];
  if (!dictionary)
    throw 'The dictionary "' + dicName + '" is not recognized.';
  
  this.nBits = dictionary.nBits;
  this.markSize = Math.sqrt(dictionary.nBits) + 2;
  for (var i = 0; i < dictionary.codeList.length; i++) {
    var code = null;
    if (typeof dictionary.codeList[i] === 'number')
      code = this._hex2bin(dictionary.codeList[i], dictionary.nBits);
    if (typeof dictionary.codeList[i] === 'string')
      code = this._hex2bin(parseInt(dictionary.codeList[i], 16), dictionary.nBits);
    if (Array.isArray(dictionary.codeList[i])) 
      code = this._bytes2bin(dictionary.codeList[i], dictionary.nBits);
    if (code === null) 
      throw 'Invalid code ' + i + ' in dictionary ' + dicName + ': ' + JSON.stringify(dictionary.codeList[i]);
    if (code.length != dictionary.nBits)
      throw 'The code ' + i + ' in dictionary ' + dicName + ' is not ' +  dictionary.nBits + ' bits long but ' + code.length + ': ' + code;
    this.codeList.push(code);
    this.codes[code] = {
      id: i
    };
  }
  this.tau = dictionary.tau || this._calculateTau();
};

AR.Dictionary.prototype.find = function (bits) {
  var val = '',
    i, j;
  for (i = 0; i < bits.length; i++) {
    var bitRow = bits[i];
    for (j = 0; j < bitRow.length; j++) {
      val += bitRow[j];
    }
  }
  var minFound = this.codes[val];
  if (minFound)
    return {
      id: minFound.id,
      distance: 0
    };

  for (i = 0; i < this.codeList.length; i++) {
    var code = this.codeList[i];
    var distance = this._hammingDistance(val, code);
    if (this._hammingDistance(val, code) < this.tau) {
      if (!minFound || minFound.distance > distance) {
        minFound = {
          id: this.codes[code].id,
          distance: distance
        };
      }
    }
  }
  return minFound;
};

AR.Dictionary.prototype._hex2bin = function (hex, nBits) {
  return hex.toString(2).padStart(nBits, '0');
};

AR.Dictionary.prototype._bytes2bin = function (byteList, nBits) {
  var bits = '', byte;
  for (byte of byteList) {
    bits += byte.toString(2).padStart(bits.length + 8 > nBits?nBits - bits.length:8, '0');
  }
  return bits;
};

AR.Dictionary.prototype._hammingDistance = function (str1, str2) {
  if (str1.length != str2.length)
    throw 'Hamming distance calculation require inputs of the same length';
  var distance = 0,
    i;
  for (i = 0; i < str1.length; i++)
    if (str1[i] !== str2[i])
      distance += 1;
  return distance;
};

AR.Dictionary.prototype._calculateTau = function () {
  var tau = Number.MAX_VALUE;
  for(var i=0;i<this.codeList.length;i++)
    for(var j=i+1;j<this.codeList.length;j++) {
      var distance = this._hammingDistance(this.codeList[i], this.codeList[j]);
      tau = distance < tau ? distance : tau;
    }
  return tau;
};

AR.Dictionary.prototype.generateSVG = function (id) {
  var code = this.codeList[id];
  if (code == null)
    throw 'The id "' + id + '" is not valid for the dictionary "' + this.dicName + '". ID must be between 0 and ' + (this.codeList.length-1) + ' included.';
  var size = this.markSize - 2;
  var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+ (size+4) + ' ' + (size+4) + '">';
  svg += '<rect x="0" y="0" width="' + (size+4) + '" height="' + (size+4) + '" fill="white"/>';
  svg += '<rect x="1" y="1" width="' + (size+2) + '" height="' + (size+2) + '" fill="black"/>';
  for(var y=0;y<size;y++) {
    for(var x=0;x<size;x++) {
      if (code[y*size+x]=='1') 
        svg += '<rect x="' + (x+2) + '" y="' + (y+2) + '" width="1" height="1" fill="white"/>';
    }
  }
  svg += '</svg>';
  return svg;
};

AR.Marker = function (id, corners, hammingDistance) {
  this.id = id;
  this.corners = corners;
  this.hammingDistance = hammingDistance;
};

AR.Detector = function (config) {
  config = config || {};
  this.grey = new CV.Image();
  this.thres = new CV.Image();
  this.homography = new CV.Image();
  this.binary = [];
  this.contours = [];
  this.polys = [];
  this.candidates = [];
  config.dictionaryName = config.dictionaryName || 'ARUCO_MIP_36h12';
  this.dictionary = new AR.Dictionary(config.dictionaryName);
  this.dictionary.tau = config.maxHammingDistance != null ? config.maxHammingDistance : this.dictionary.tau;
};

AR.Detector.prototype.detectImage = function (width, height, data) {
  return this.detect({
    width: width,
    height: height,
    data: data
  });
};

AR.Detector.prototype.detectStreamInit = function (width, height, callback) {
  this.streamConfig = {};
  this.streamConfig.width = width;
  this.streamConfig.height = height;
  this.streamConfig.imageSize = width * height * 4; //provided image must be a sequence of rgba bytes (4 bytes represent a pixel)
  this.streamConfig.index = 0;
  this.streamConfig.imageData = new Uint8ClampedArray(this.streamConfig.imageSize);
  this.streamConfig.callback = callback || function (image, markerList) {};
};

//accept data chunks of different sizes
AR.Detector.prototype.detectStream = function (data) {
  for (var i = 0; i < data.length; i++) {
    this.streamConfig.imageData[this.streamConfig.index] = data[i];
    this.streamConfig.index = (this.streamConfig.index + 1) % this.streamConfig.imageSize;
    if (this.streamConfig.index == 0) {
      var image = {
        width: this.streamConfig.width,
        height: this.streamConfig.height,
        data: this.streamConfig.imageData
      };
      var markerList = this.detect(image);
      this.streamConfig.callback(image, markerList);
    }
  }
};

AR.Detector.prototype.detectMJPEGStreamInit = function (width, height, callback, decoderFn) {
  this.mjpeg = {
    decoderFn: decoderFn,
    chunks: [],
    SOI: [0xff, 0xd8],
    EOI: [0xff, 0xd9]
  };
  this.detectStreamInit(width, height, callback);
};

AR.Detector.prototype.detectMJPEGStream = function (chunk) {
  var eoiPos = chunk.findIndex(function (element, index, array) {
    return this.mjpeg.EOI[0] == element && array.length > index + 1 && this.mjpeg.EOI[1] == array[index + 1];
  });
  var soiPos = chunk.findIndex(function (element, index, array) {
    return this.mjpeg.SOI[0] == element && array.length > index + 1 && this.mjpeg.SOI[1] == array[index + 1];
  });

  if (eoiPos === -1) {
    this.mjpeg.chunks.push(chunk);
  } else {
    var part1 = chunk.slice(0, eoiPos + 2);
    if (part1.length) {
      this.mjpeg.chunks.push(part1);
    }
    if (this.mjpeg.chunks.length) {
      var jpegImage = this.mjpeg.chunks.flat();
      var rgba = this.mjpeg.decoderFn(jpegImage);
      this.detectStream(rgba);
    }
    this.mjpeg.chunks = [];
  }
  if (soiPos > -1) {
    this.mjpeg.chunks = [];
    this.mjpeg.chunks.push(chunk.slice(soiPos));
  }
};

AR.Detector.prototype.detect = function (image) {
  CV.grayscale(image, this.grey);
  CV.adaptiveThreshold(this.grey, this.thres, 2, 7);

  this.contours = CV.findContours(this.thres, this.binary);
  //Scale Fix: https://stackoverflow.com/questions/35936397/marker-detection-on-paper-sheet-using-javascript
  //this.candidates = this.findCandidates(this.contours, image.width * 0.20, 0.05, 10);
  this.candidates = this.findCandidates(this.contours, image.width * 0.01, 0.05, 10);
  this.candidates = this.clockwiseCorners(this.candidates);
  this.candidates = this.notTooNear(this.candidates, 10);

  return this.findMarkers(this.grey, this.candidates, 49);
};

AR.Detector.prototype.findCandidates = function (contours, minSize, epsilon, minLength) {
  var candidates = [],
    len = contours.length,
    contour, poly, i;

  this.polys = [];

  for (i = 0; i < len; ++i) {
    contour = contours[i];

    if (contour.length >= minSize) {
      poly = CV.approxPolyDP(contour, contour.length * epsilon);

      this.polys.push(poly);

      if ((4 === poly.length) && (CV.isContourConvex(poly))) {

        if (CV.minEdgeLength(poly) >= minLength) {
          candidates.push(poly);
        }
      }
    }
  }

  return candidates;
};

AR.Detector.prototype.clockwiseCorners = function (candidates) {
  var len = candidates.length,
    dx1, dx2, dy1, dy2, swap, i;

  for (i = 0; i < len; ++i) {
    dx1 = candidates[i][1].x - candidates[i][0].x;
    dy1 = candidates[i][1].y - candidates[i][0].y;
    dx2 = candidates[i][2].x - candidates[i][0].x;
    dy2 = candidates[i][2].y - candidates[i][0].y;

    if ((dx1 * dy2 - dy1 * dx2) < 0) {
      swap = candidates[i][1];
      candidates[i][1] = candidates[i][3];
      candidates[i][3] = swap;
    }
  }

  return candidates;
};

AR.Detector.prototype.notTooNear = function (candidates, minDist) {
  var notTooNear = [],
    len = candidates.length,
    dist, dx, dy, i, j, k;

  for (i = 0; i < len; ++i) {

    for (j = i + 1; j < len; ++j) {
      dist = 0;

      for (k = 0; k < 4; ++k) {
        dx = candidates[i][k].x - candidates[j][k].x;
        dy = candidates[i][k].y - candidates[j][k].y;

        dist += dx * dx + dy * dy;
      }

      if ((dist / 4) < (minDist * minDist)) {

        if (CV.perimeter(candidates[i]) < CV.perimeter(candidates[j])) {
          candidates[i].tooNear = true;
        } else {
          candidates[j].tooNear = true;
        }
      }
    }
  }

  for (i = 0; i < len; ++i) {
    if (!candidates[i].tooNear) {
      notTooNear.push(candidates[i]);
    }
  }

  return notTooNear;
};

AR.Detector.prototype.findMarkers = function (imageSrc, candidates, warpSize) {
  var markers = [],
    len = candidates.length,
    candidate, marker, i;

  for (i = 0; i < len; ++i) {
    candidate = candidates[i];

    CV.warp(imageSrc, this.homography, candidate, warpSize);

    CV.threshold(this.homography, this.homography, CV.otsu(this.homography));

    marker = this.getMarker(this.homography, candidate);
    if (marker) {
      markers.push(marker);
    }
  }

  return markers;
};

AR.Detector.prototype.getMarker = function (imageSrc, candidate) {
  var markSize = this.dictionary.markSize;
  var width = (imageSrc.width / markSize) >>> 0,
    minZero = (width * width) >> 1,
    bits = [],
    rotations = [],
    square, inc, i, j;

  for (i = 0; i < markSize; ++i) {
    inc = (0 === i || (markSize - 1) === i) ? 1 : (markSize - 1);

    for (j = 0; j < markSize; j += inc) {
      square = {
        x: j * width,
        y: i * width,
        width: width,
        height: width
      };
      if (CV.countNonZero(imageSrc, square) > minZero) {
        return null;
      }
    }
  }

  for (i = 0; i < markSize - 2; ++i) {
    bits[i] = [];

    for (j = 0; j < markSize - 2; ++j) {
      square = {
        x: (j + 1) * width,
        y: (i + 1) * width,
        width: width,
        height: width
      };

      bits[i][j] = CV.countNonZero(imageSrc, square) > minZero ? 1 : 0;
    }
  }

  rotations[0] = bits;

  var foundMin = null;
  var rot = 0;
  for (i = 0; i < 4; i++) {
    var found = this.dictionary.find(rotations[i]);
    if (found && (foundMin === null || found.distance < foundMin.distance)) {
      foundMin = found;
      rot = i;
      if (foundMin.distance === 0)
        break;
    }
    rotations[i + 1] = this.rotate(rotations[i]);
  }

  if (foundMin)
    return new AR.Marker(foundMin.id, this.rotate2(candidate, 4 - rot), foundMin.distance);

  return null;
};

AR.Detector.prototype.rotate = function (src) {
  var dst = [],
    len = src.length,
    i, j;

  for (i = 0; i < len; ++i) {
    dst[i] = [];
    for (j = 0; j < src[i].length; ++j) {
      dst[i][j] = src[src[i].length - j - 1][i];
    }
  }

  return dst;
};

AR.Detector.prototype.rotate2 = function (src, rotation) {
  var dst = [],
    len = src.length,
    i;

  for (i = 0; i < len; ++i) {
    dst[i] = src[(rotation + i) % len];
  }

  return dst;
};
