export const LIFE_SWAP_SLICE = Object.freeze({
  showName: "奶蛙交换计划",
  homeTitle: "别人养龙虾，你养奶蛙。",
  homeIntro: "今天互换人生：它替你上班，你替它回老板。你的班味，先让它尝尝。",
  questionEyebrow: "周五 09:13 · 你的工位",
  question: "老板在群里说：周末大家自愿来一下。",
});

export const CHOICES = Object.freeze([
  Object.freeze({ id: "ignore", key: "A", label: "装没看见", tone: "quiet" }),
  Object.freeze({ id: "overtime", key: "B", label: "问有没有加班费", tone: "direct" }),
  Object.freeze({ id: "later", key: "C", label: "先答应，到时候再说", tone: "risky" }),
  Object.freeze({ id: "weekend", key: "D", label: "向周末本人请假", tone: "naiwa" }),
]);

export const OUTCOMES = Object.freeze({
  ignore: Object.freeze({
    title: "你成功没有看见。",
    punchline: "奶蛙用两张便利贴，完成了物理免打扰。",
    consequence: "同事开始认为你正在进行一场沉默抗议。",
    route: "人生偏移：沉默型意见领袖 +1",
    image: "./assets/life-swap/outcome-ignore.png",
    alt: "奶蛙坐在会议桌前，用两张黄色便利贴挡住自己的大眼睛。",
  }),
  overtime: Object.freeze({
    title: "它问得非常具体。",
    punchline: "奶蛙没问金额，直接往群里发了收款码。",
    consequence: "三名同事已经付款，你被推举为临时财务代表。",
    route: "人生偏移：民间权益代言人 +1",
    image: "./assets/life-swap/outcome-overtime.png",
    alt: "奶蛙在办公室举着收款牌，周围同事惊讶地拿起手机。",
  }),
  later: Object.freeze({
    title: "它答应得过于完整。",
    punchline: "睡袋、牙刷和小台灯，已经搬进你的工位。",
    consequence: "公司把你列入了二十四小时办公试点。",
    route: "人生偏移：低成本永动员工 +1",
    image: "./assets/life-swap/outcome-later.png",
    alt: "奶蛙住进办公室桌下的睡袋，旁边摆着牙刷和小台灯。",
  }),
  weekend: Object.freeze({
    title: "星期六批准了。",
    punchline: "奶蛙向周末本人递交了请假条。",
    consequence: "星期六同意。老板暂时没找到可以反对的主体。",
    route: "人生偏移：超现实劳动仲裁员 +1",
    image: "./assets/life-swap/outcome-weekend.png",
    alt: "奶蛙向一张坐在柜台后的日历递交请假条，远处的老板愣住了。",
  }),
});
