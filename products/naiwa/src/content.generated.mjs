// Generated from the OpenSpec material ledgers. Do not edit by hand.
export const GENERATED_ROUTE_DATA = {
  "late-work": {
    "id": "late-work",
    "title": "临近下班突然加活",
    "subtitle": "周五 17:43，电脑都要关了，周末 PPT 来了。",
    "contentVersion": "late-work.graph.preview.2026-07-22.v1",
    "startNodeId": "late-work.q.open-1743",
    "allowedSceneObjects": [
      "预算表",
      "PPT 版本",
      "数据口径",
      "群聊确认",
      "附件",
      "工时记录"
    ],
    "questions": {
      "late-work.q.open-1743": {
        "id": "late-work.q.open-1743",
        "routeId": "late-work",
        "stage": 1,
        "prompt": "周五 17:43，奶蛙已经把充电线绕好，屏幕正在倒数关机。领导发来：客户周一要看，你周末有空把这份 PPT 弄一下？ 你怎么回？",
        "sourceRefs": [
          "LW-S01",
          "LW-S02",
          "LW-S08"
        ],
        "options": [
          {
            "id": "late-work.q.open-1743.option.accept",
            "label": "收到，周日几点前要？",
            "intent": "normal",
            "stateTags": [
              "respectful-acceptance",
              "weekend-possible"
            ],
            "sourceRefs": [
              "LW-S01",
              "LW-S02",
              "LW-S08"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "收到，周日几点前要？",
            "consequence": {
              "id": "late-work.q.open-1743.option.accept.consequence",
              "action": "奶蛙把关机线重新插回去。",
              "npcReaction": "领导回：`周日晚上先发我。先弄得像样点。` “弄哪块”仍没说清",
              "visibleStateChange": "奶蛙把关机线重新插回去。 领导回：`周日晚上先发我。先弄得像样点。` “弄哪块”仍没说清",
              "nextNodeId": "late-work.q.scope-accepted"
            }
          },
          {
            "id": "late-work.q.open-1743.option.boundary",
            "label": "我周末有安排，真来不了。周一一早可以接。",
            "intent": "boundary",
            "stateTags": [
              "hard-boundary",
              "weekend-unavailable"
            ],
            "sourceRefs": [
              "LW-S01",
              "LW-S02",
              "LW-S08"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "我周末有安排，真来不了。周一一早可以接。",
            "consequence": {
              "id": "late-work.q.open-1743.option.boundary.consequence",
              "action": "奶蛙把周末日历盖住。",
              "npcReaction": "领导停了十几秒：`那今晚能不能先留个框架？`",
              "visibleStateChange": "奶蛙把周末日历盖住。 领导停了十几秒：`那今晚能不能先留个框架？`",
              "nextNodeId": "late-work.q.scope-boundary"
            }
          },
          {
            "id": "late-work.q.open-1743.option.priority",
            "label": "PPT 接了，那预算表先停？",
            "intent": "strategy",
            "stateTags": [
              "priority-coordination",
              "budget-conflict-visible"
            ],
            "sourceRefs": [
              "LW-S01",
              "LW-S02",
              "LW-S08"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "PPT 接了，那预算表先停？",
            "consequence": {
              "id": "late-work.q.open-1743.option.priority.consequence",
              "action": "奶蛙把预算表和 PPT 放到两个工位。",
              "npcReaction": "领导回：`预算表周一九点也要。` 两件事第一次被摆到同一张桌上",
              "visibleStateChange": "奶蛙把预算表和 PPT 放到两个工位。 领导回：`预算表周一九点也要。` 两件事第一次被摆到同一张桌上",
              "nextNodeId": "late-work.q.scope-priority"
            }
          },
          {
            "id": "late-work.q.open-1743.option.time-slot",
            "label": "可以。我先给周末两小时在工时表里占个位，下周哪天调休您定？",
            "intent": "absurd",
            "stateTags": [
              "time-compensation",
              "object-logic",
              "time-record-opened"
            ],
            "sourceRefs": [
              "LW-S01",
              "LW-S02",
              "LW-S08"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "可以。我先给周末两小时在工时表里占个位，下周哪天调休您定？",
            "consequence": {
              "id": "late-work.q.open-1743.option.time-slot.consequence",
              "action": "奶蛙给空工位贴`周末工时：待认领`。",
              "npcReaction": "领导回：`先做，调休周一说。`",
              "visibleStateChange": "奶蛙给空工位贴`周末工时：待认领`。 领导回：`先做，调休周一说。`",
              "nextNodeId": "late-work.q.scope-time"
            }
          }
        ],
        "sceneObjects": [
          "预算表",
          "PPT 版本",
          "数据口径",
          "群聊确认",
          "附件",
          "工时记录"
        ],
        "contentVersion": "late-work.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "late-work.q.scope-accepted": {
        "id": "late-work.q.scope-accepted",
        "routeId": "late-work",
        "stage": 2,
        "prompt": "领导又发来三个附件：客户汇报V5.pptx、最终版.pptx、最终版_真.pptx，只补一句：先弄得像样点。 你先把范围钉在哪？",
        "sourceRefs": [
          "LW-S01",
          "LW-S05"
        ],
        "options": [
          {
            "id": "late-work.q.scope-accepted.option.ask-three",
            "label": "我先确认一下：逻辑、版式、数据，您最想先看哪个？",
            "intent": "strategy",
            "stateTags": [
              "evidence-first",
              "scope-requested"
            ],
            "sourceRefs": [
              "LW-S01",
              "LW-S05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "我先确认一下：逻辑、版式、数据，您最想先看哪个？",
            "consequence": {
              "id": "late-work.q.scope-accepted.option.ask-three.consequence",
              "action": "奶蛙把三件事做成三个勾选框。",
              "npcReaction": "领导勾了`逻辑`，又说`数据别错`，母版仍待确认",
              "visibleStateChange": "奶蛙把三件事做成三个勾选框。 领导勾了`逻辑`，又说`数据别错`，母版仍待确认",
              "nextNodeId": "late-work.q.version-master"
            }
          },
          {
            "id": "late-work.q.scope-accepted.option.logic-first",
            "label": "我按客户版本改逻辑，版式先不动。",
            "intent": "normal",
            "stateTags": [
              "respectful-acceptance",
              "logic-first"
            ],
            "sourceRefs": [
              "LW-S01",
              "LW-S05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "我按客户版本改逻辑，版式先不动。",
            "consequence": {
              "id": "late-work.q.scope-accepted.option.logic-first.consequence",
              "action": "奶蛙把字体工具收进抽屉，只展开目录。",
              "npcReaction": "领导回：`行，但客户刚又发了一版。`",
              "visibleStateChange": "奶蛙把字体工具收进抽屉，只展开目录。 领导回：`行，但客户刚又发了一版。`",
              "nextNodeId": "late-work.q.version-client"
            }
          },
          {
            "id": "late-work.q.scope-accepted.option.layout-first",
            "label": "我先把版式拉齐，数据原样保留。",
            "intent": "boundary",
            "stateTags": [
              "limited-commitment",
              "layout-first"
            ],
            "sourceRefs": [
              "LW-S01",
              "LW-S05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "我先把版式拉齐，数据原样保留。",
            "consequence": {
              "id": "late-work.q.scope-accepted.option.layout-first.consequence",
              "action": "奶蛙给数据区套上只读框。",
              "npcReaction": "设计同事提醒：`模板母版别覆盖。`",
              "visibleStateChange": "奶蛙给数据区套上只读框。 设计同事提醒：`模板母版别覆盖。`",
              "nextNodeId": "late-work.q.version-layout-lock"
            }
          },
          {
            "id": "late-work.q.scope-accepted.option.paternity-test",
            "label": "我先把三份差异拉出来，别让“最终版”互相认亲。",
            "intent": "absurd",
            "stateTags": [
              "object-logic",
              "version-forensics"
            ],
            "sourceRefs": [
              "LW-S01",
              "LW-S05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "我先把三份差异拉出来，别让“最终版”互相认亲。",
            "consequence": {
              "id": "late-work.q.scope-accepted.option.paternity-test.consequence",
              "action": "三份附件被摆进`PPT 亲子鉴定`对照页；修改时间和作者开始互相打架",
              "npcReaction": "三份附件被摆进`PPT 亲子鉴定`对照页；修改时间和作者开始互相打架",
              "visibleStateChange": "三份附件被摆进`PPT 亲子鉴定`对照页；修改时间和作者开始互相打架 三份附件被摆进`PPT 亲子鉴定`对照页；修改时间和作者开始互相打架",
              "nextNodeId": "late-work.q.version-forensic"
            }
          }
        ],
        "sceneObjects": [
          "预算表",
          "PPT 版本",
          "数据口径",
          "群聊确认",
          "附件",
          "工时记录"
        ],
        "contentVersion": "late-work.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "late-work.q.scope-boundary": {
        "id": "late-work.q.scope-boundary",
        "routeId": "late-work",
        "stage": 2,
        "prompt": "领导追问：周末不做也行，那你今晚先留个框架？ 17:47，预算表还有两项没核完。你怎么划今晚的边界？",
        "sourceRefs": [
          "LW-S01",
          "LW-S02",
          "LW-S03"
        ],
        "options": [
          {
            "id": "late-work.q.scope-boundary.option.twelve-minutes",
            "label": "可以，17:59前发目录和缺数清单，周末不在线。",
            "intent": "normal",
            "stateTags": [
              "hard-boundary",
              "bounded-handoff"
            ],
            "sourceRefs": [
              "LW-S01",
              "LW-S02",
              "LW-S03"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "可以，17:59前发目录和缺数清单，周末不在线。",
            "consequence": {
              "id": "late-work.q.scope-boundary.option.twelve-minutes.consequence",
              "action": "奶蛙把倒计时改成 12 分钟，只建目录。",
              "npcReaction": "领导随后转来客户的新附件",
              "visibleStateChange": "奶蛙把倒计时改成 12 分钟，只建目录。 领导随后转来客户的新附件",
              "nextNodeId": "late-work.q.version-client"
            }
          },
          {
            "id": "late-work.q.scope-boundary.option.monday-start",
            "label": "今晚也排满了，周一 8:30 开始。",
            "intent": "boundary",
            "stateTags": [
              "hard-boundary",
              "no-extra-work"
            ],
            "sourceRefs": [
              "LW-S01",
              "LW-S02",
              "LW-S03"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "今晚也排满了，周一 8:30 开始。",
            "consequence": {
              "id": "late-work.q.scope-boundary.option.monday-start.consequence",
              "action": "奶蛙关掉编辑权限。",
              "npcReaction": "领导把模板发来：`那先别动母版。`",
              "visibleStateChange": "奶蛙关掉编辑权限。 领导把模板发来：`那先别动母版。`",
              "nextNodeId": "late-work.q.version-layout-lock"
            }
          },
          {
            "id": "late-work.q.scope-boundary.option.status-together",
            "label": "我把预算表状态和 PPT 缺口一起发，您今晚定先后。",
            "intent": "strategy",
            "stateTags": [
              "priority-coordination",
              "scope-and-priority-visible"
            ],
            "sourceRefs": [
              "LW-S01",
              "LW-S02",
              "LW-S03"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "我把预算表状态和 PPT 缺口一起发，您今晚定先后。",
            "consequence": {
              "id": "late-work.q.scope-boundary.option.status-together.consequence",
              "action": "一页状态表同时显示两个截止时间，领导圈出`先定PPT母版`",
              "npcReaction": "一页状态表同时显示两个截止时间，领导圈出`先定PPT母版`",
              "visibleStateChange": "一页状态表同时显示两个截止时间，领导圈出`先定PPT母版` 一页状态表同时显示两个截止时间，领导圈出`先定PPT母版`",
              "nextNodeId": "late-work.q.version-master"
            }
          },
          {
            "id": "late-work.q.scope-boundary.option.empty-skeleton",
            "label": "玩家确认奶蛙只搭六张空白页，每页写清缺什么，不填任何猜测数据",
            "intent": "absurd",
            "stateTags": [
              "object-logic",
              "no-fabrication"
            ],
            "sourceRefs": [
              "LW-S01",
              "LW-S02",
              "LW-S03"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "玩家确认奶蛙只搭六张空白页，每页写清缺什么，不填任何猜测数据",
            "consequence": {
              "id": "late-work.q.scope-boundary.option.empty-skeleton.consequence",
              "action": "六张空白页排成候诊区，三个“最终版”在门口等待挂号",
              "npcReaction": "六张空白页排成候诊区，三个“最终版”在门口等待挂号",
              "visibleStateChange": "六张空白页排成候诊区，三个“最终版”在门口等待挂号 六张空白页排成候诊区，三个“最终版”在门口等待挂号",
              "nextNodeId": "late-work.q.version-forensic"
            }
          }
        ],
        "sceneObjects": [
          "预算表",
          "PPT 版本",
          "数据口径",
          "群聊确认",
          "附件",
          "工时记录"
        ],
        "contentVersion": "late-work.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "late-work.q.scope-priority": {
        "id": "late-work.q.scope-priority",
        "routeId": "late-work",
        "stage": 2,
        "prompt": "领导回：预算表周一九点，PPT周一十点，最好都别停。 两件事都急，但周末只有一份你。下一句说什么？",
        "sourceRefs": [
          "LW-S01",
          "LW-S07"
        ],
        "options": [
          {
            "id": "late-work.q.scope-priority.option.choose-one",
            "label": "两个都按原标准做不完，您定一个先。",
            "intent": "strategy",
            "stateTags": [
              "priority-coordination",
              "owner-decides"
            ],
            "sourceRefs": [
              "LW-S01",
              "LW-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "两个都按原标准做不完，您定一个先。",
            "consequence": {
              "id": "late-work.q.scope-priority.option.choose-one.consequence",
              "action": "奶蛙把两个任务放进一进一出的闸机。",
              "npcReaction": "领导说：`先PPT，但要用对版本。`",
              "visibleStateChange": "奶蛙把两个任务放进一进一出的闸机。 领导说：`先PPT，但要用对版本。`",
              "nextNodeId": "late-work.q.version-master"
            }
          },
          {
            "id": "late-work.q.scope-priority.option.split-depth",
            "label": "我今晚收预算表，PPT 周日只做逻辑，版式周一再说。",
            "intent": "boundary",
            "stateTags": [
              "reality-plan",
              "scope-split"
            ],
            "sourceRefs": [
              "LW-S01",
              "LW-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "我今晚收预算表，PPT 周日只做逻辑，版式周一再说。",
            "consequence": {
              "id": "late-work.q.scope-priority.option.split-depth.consequence",
              "action": "工作被拆成三个时间盒；客户的新反馈刚好落进“逻辑”盒",
              "npcReaction": "工作被拆成三个时间盒；客户的新反馈刚好落进“逻辑”盒",
              "visibleStateChange": "工作被拆成三个时间盒；客户的新反馈刚好落进“逻辑”盒 工作被拆成三个时间盒；客户的新反馈刚好落进“逻辑”盒",
              "nextNodeId": "late-work.q.version-client"
            }
          },
          {
            "id": "late-work.q.scope-priority.option.ask-owner",
            "label": "业务同事能不能给最终数据？我只整合。",
            "intent": "normal",
            "stateTags": [
              "reality-plan",
              "data-owner-requested"
            ],
            "sourceRefs": [
              "LW-S01",
              "LW-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "业务同事能不能给最终数据？我只整合。",
            "consequence": {
              "id": "late-work.q.scope-priority.option.ask-owner.consequence",
              "action": "领导拉来业务同事，对方先提醒`模板别改坏`",
              "npcReaction": "领导拉来业务同事，对方先提醒`模板别改坏`",
              "visibleStateChange": "领导拉来业务同事，对方先提醒`模板别改坏` 领导拉来业务同事，对方先提醒`模板别改坏`",
              "nextNodeId": "late-work.q.version-layout-lock"
            }
          },
          {
            "id": "late-work.q.scope-priority.option.two-desks",
            "label": "玩家确认奶蛙给 PPT 和预算表各摆一个工位，空工位贴`等一位同事`",
            "intent": "absurd",
            "stateTags": [
              "object-logic",
              "resource-gap-visible"
            ],
            "sourceRefs": [
              "LW-S01",
              "LW-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "玩家确认奶蛙给 PPT 和预算表各摆一个工位，空工位贴`等一位同事`",
            "consequence": {
              "id": "late-work.q.scope-priority.option.two-desks.consequence",
              "action": "办公室没有凭空长出第二个人，领导只好打开三份版本对照",
              "npcReaction": "办公室没有凭空长出第二个人，领导只好打开三份版本对照",
              "visibleStateChange": "办公室没有凭空长出第二个人，领导只好打开三份版本对照 办公室没有凭空长出第二个人，领导只好打开三份版本对照",
              "nextNodeId": "late-work.q.version-forensic"
            }
          }
        ],
        "sceneObjects": [
          "预算表",
          "PPT 版本",
          "数据口径",
          "群聊确认",
          "附件",
          "工时记录"
        ],
        "contentVersion": "late-work.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "late-work.q.scope-time": {
        "id": "late-work.q.scope-time",
        "routeId": "late-work",
        "stage": 2,
        "prompt": "领导说：先做，调休周一再说。 任务范围和补休都还漂着。你准备先锁哪一层承诺？",
        "sourceRefs": [
          "LW-S03",
          "LW-S04"
        ],
        "options": [
          {
            "id": "late-work.q.scope-time.option.two-hour-cap",
            "label": "好，我先做两小时；超过的部分周日再跟您确认。",
            "intent": "normal",
            "stateTags": [
              "time-compensation",
              "time-cap"
            ],
            "sourceRefs": [
              "LW-S03",
              "LW-S04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "好，我先做两小时；超过的部分周日再跟您确认。",
            "consequence": {
              "id": "late-work.q.scope-time.option.two-hour-cap.consequence",
              "action": "奶蛙启动两小时沙漏。",
              "npcReaction": "领导先要求`用对母版，别返工`",
              "visibleStateChange": "奶蛙启动两小时沙漏。 领导先要求`用对母版，别返工`",
              "nextNodeId": "late-work.q.version-master"
            }
          },
          {
            "id": "late-work.q.scope-time.option.gap-list-only",
            "label": "调休没定之前，我先列需求和缺口，不承诺成稿。",
            "intent": "boundary",
            "stateTags": [
              "hard-boundary",
              "no-final-commitment"
            ],
            "sourceRefs": [
              "LW-S03",
              "LW-S04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "调休没定之前，我先列需求和缺口，不承诺成稿。",
            "consequence": {
              "id": "late-work.q.scope-time.option.gap-list-only.consequence",
              "action": "成稿按钮被套上保护罩，客户新版本只进入待确认区",
              "npcReaction": "成稿按钮被套上保护罩，客户新版本只进入待确认区",
              "visibleStateChange": "成稿按钮被套上保护罩，客户新版本只进入待确认区 成稿按钮被套上保护罩，客户新版本只进入待确认区",
              "nextNodeId": "late-work.q.version-client"
            }
          },
          {
            "id": "late-work.q.scope-time.option.group-confirm",
            "label": "您在群里回一句“周末做、下周调”，我好登记。",
            "intent": "strategy",
            "stateTags": [
              "evidence-first",
              "comp-confirmation-requested"
            ],
            "sourceRefs": [
              "LW-S03",
              "LW-S04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "您在群里回一句“周末做、下周调”，我好登记。",
            "consequence": {
              "id": "late-work.q.scope-time.option.group-confirm.consequence",
              "action": "领导在群里确认`周末两小时，下周调`，设计同事顺手锁定母版",
              "npcReaction": "领导在群里确认`周末两小时，下周调`，设计同事顺手锁定母版",
              "visibleStateChange": "领导在群里确认`周末两小时，下周调`，设计同事顺手锁定母版 领导在群里确认`周末两小时，下周调`，设计同事顺手锁定母版",
              "nextNodeId": "late-work.q.version-layout-lock"
            }
          },
          {
            "id": "late-work.q.scope-time.option.futures-slip",
            "label": "玩家确认奶蛙打印`调休期货：周一待交割`，连同任务截图夹进工时表",
            "intent": "absurd",
            "stateTags": [
              "object-logic",
              "time-record-opened"
            ],
            "sourceRefs": [
              "LW-S03",
              "LW-S04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "玩家确认奶蛙打印`调休期货：周一待交割`，连同任务截图夹进工时表",
            "consequence": {
              "id": "late-work.q.scope-time.option.futures-slip.consequence",
              "action": "纸条没有变成假期，却让三个版本的时间戳一目了然",
              "npcReaction": "纸条没有变成假期，却让三个版本的时间戳一目了然",
              "visibleStateChange": "纸条没有变成假期，却让三个版本的时间戳一目了然 纸条没有变成假期，却让三个版本的时间戳一目了然",
              "nextNodeId": "late-work.q.version-forensic"
            }
          }
        ],
        "sceneObjects": [
          "预算表",
          "PPT 版本",
          "数据口径",
          "群聊确认",
          "附件",
          "工时记录"
        ],
        "contentVersion": "late-work.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "late-work.q.version-master": {
        "id": "late-work.q.version-master",
        "routeId": "late-work",
        "stage": 3,
        "prompt": "共享盘里出现最终版_v6、最终版_v6_老板批注、最终版_v6_客户已看。三个修改时间只差七分钟。哪份做母版？",
        "sourceRefs": [
          "LW-S05"
        ],
        "options": [
          {
            "id": "late-work.q.version-master.option.owner-picks",
            "label": "三份我都不覆盖，您指定一份母版。",
            "intent": "strategy",
            "stateTags": [
              "evidence-first",
              "master-owner-confirmed"
            ],
            "sourceRefs": [
              "LW-S05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "三份我都不覆盖，您指定一份母版。",
            "consequence": {
              "id": "late-work.q.version-master.option.owner-picks.consequence",
              "action": "领导指定`客户已看`，但其中 82/79/85 三个数字仍无人认领",
              "npcReaction": "领导指定`客户已看`，但其中 82/79/85 三个数字仍无人认领",
              "visibleStateChange": "领导指定`客户已看`，但其中 82/79/85 三个数字仍无人认领 领导指定`客户已看`，但其中 82/79/85 三个数字仍无人认领",
              "nextNodeId": "late-work.q.metric-owner"
            }
          },
          {
            "id": "late-work.q.version-master.option.timeline",
            "label": "我先按修改时间做一张差异表，再合并。",
            "intent": "boundary",
            "stateTags": [
              "reality-plan",
              "version-history-used"
            ],
            "sourceRefs": [
              "LW-S05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "我先按修改时间做一张差异表，再合并。",
            "consequence": {
              "id": "late-work.q.version-master.option.timeline.consequence",
              "action": "七分钟被展开成时间轴，发现两份取数周期不同",
              "npcReaction": "七分钟被展开成时间轴，发现两份取数周期不同",
              "visibleStateChange": "七分钟被展开成时间轴，发现两份取数周期不同 七分钟被展开成时间轴，发现两份取数周期不同",
              "nextNodeId": "late-work.q.metric-window"
            }
          },
          {
            "id": "late-work.q.version-master.option.client-base",
            "label": "以客户看过的为底，老板批注另加一层。",
            "intent": "normal",
            "stateTags": [
              "respectful-acceptance",
              "client-baseline"
            ],
            "sourceRefs": [
              "LW-S05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "以客户看过的为底，老板批注另加一层。",
            "consequence": {
              "id": "late-work.q.version-master.option.client-base.consequence",
              "action": "逻辑保住了，客户版里的`转化率`却没写分母",
              "npcReaction": "逻辑保住了，客户版里的`转化率`却没写分母",
              "visibleStateChange": "逻辑保住了，客户版里的`转化率`却没写分母 逻辑保住了，客户版里的`转化率`却没写分母",
              "nextNodeId": "late-work.q.metric-definition"
            }
          },
          {
            "id": "late-work.q.version-master.option.lock-two",
            "label": "玩家确认奶蛙给两份非母版盖`只读旁证`，禁止继续繁殖",
            "intent": "absurd",
            "stateTags": [
              "object-logic",
              "version-freeze"
            ],
            "sourceRefs": [
              "LW-S05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "玩家确认奶蛙给两份非母版盖`只读旁证`，禁止继续繁殖",
            "consequence": {
              "id": "late-work.q.version-master.option.lock-two.consequence",
              "action": "版本终于停在三份，唯一母版里的缺数格开始闪",
              "npcReaction": "版本终于停在三份，唯一母版里的缺数格开始闪",
              "visibleStateChange": "版本终于停在三份，唯一母版里的缺数格开始闪 版本终于停在三份，唯一母版里的缺数格开始闪",
              "nextNodeId": "late-work.q.metric-placeholder"
            }
          }
        ],
        "sceneObjects": [
          "预算表",
          "PPT 版本",
          "数据口径",
          "群聊确认",
          "附件",
          "工时记录"
        ],
        "contentVersion": "late-work.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "late-work.q.version-client": {
        "id": "late-work.q.version-client",
        "routeId": "late-work",
        "stage": 3,
        "prompt": "客户刚发rev3-review：数据较新，版式却是旧的；内部final版式新，数据停在上月。你怎么合？",
        "sourceRefs": [
          "LW-S05",
          "LW-S06"
        ],
        "options": [
          {
            "id": "late-work.q.version-client.option.source-layer",
            "label": "用客户新数据，来源和更新时间都标上；结构沿用内部版。",
            "intent": "normal",
            "stateTags": [
              "reality-plan",
              "source-layered"
            ],
            "sourceRefs": [
              "LW-S05",
              "LW-S06"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "用客户新数据，来源和更新时间都标上；结构沿用内部版。",
            "consequence": {
              "id": "late-work.q.version-client.option.source-layer.consequence",
              "action": "新数据进入结构后，财务、CRM、业务群三个负责人浮出水面",
              "npcReaction": "新数据进入结构后，财务、CRM、业务群三个负责人浮出水面",
              "visibleStateChange": "新数据进入结构后，财务、CRM、业务群三个负责人浮出水面 新数据进入结构后，财务、CRM、业务群三个负责人浮出水面",
              "nextNodeId": "late-work.q.metric-owner"
            }
          },
          {
            "id": "late-work.q.version-client.option.ask-status",
            "label": "先问一句：rev3 是反馈稿，还是新的母版？",
            "intent": "strategy",
            "stateTags": [
              "evidence-first",
              "version-status-requested"
            ],
            "sourceRefs": [
              "LW-S05",
              "LW-S06"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "先问一句：rev3 是反馈稿，还是新的母版？",
            "consequence": {
              "id": "late-work.q.version-client.option.ask-status.consequence",
              "action": "客户确认是反馈稿，并补一句`看近三个月`",
              "npcReaction": "客户确认是反馈稿，并补一句`看近三个月`",
              "visibleStateChange": "客户确认是反馈稿，并补一句`看近三个月` 客户确认是反馈稿，并补一句`看近三个月`",
              "nextNodeId": "late-work.q.metric-window"
            }
          },
          {
            "id": "late-work.q.version-client.option.freeze-layout",
            "label": "版式不动，只导入已经确认的新数据。",
            "intent": "boundary",
            "stateTags": [
              "limited-commitment",
              "layout-frozen"
            ],
            "sourceRefs": [
              "LW-S05",
              "LW-S06"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "版式不动，只导入已经确认的新数据。",
            "consequence": {
              "id": "late-work.q.version-client.option.freeze-layout.consequence",
              "action": "导入时暴露两边对`转化率`的定义不同",
              "npcReaction": "导入时暴露两边对`转化率`的定义不同",
              "visibleStateChange": "导入时暴露两边对`转化率`的定义不同 导入时暴露两边对`转化率`的定义不同",
              "nextNodeId": "late-work.q.metric-definition"
            }
          },
          {
            "id": "late-work.q.version-client.option.custody-form",
            "label": "玩家确认奶蛙把两版并排，做一张`PPT 监护权交接单`，未确认页保持空白",
            "intent": "absurd",
            "stateTags": [
              "object-logic",
              "no-silent-merge"
            ],
            "sourceRefs": [
              "LW-S05",
              "LW-S06"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "玩家确认奶蛙把两版并排，做一张`PPT 监护权交接单`，未确认页保持空白",
            "consequence": {
              "id": "late-work.q.version-client.option.custody-form.consequence",
              "action": "空白页没有被脑补，数据缺口被集中列出",
              "npcReaction": "空白页没有被脑补，数据缺口被集中列出",
              "visibleStateChange": "空白页没有被脑补，数据缺口被集中列出 空白页没有被脑补，数据缺口被集中列出",
              "nextNodeId": "late-work.q.metric-placeholder"
            }
          }
        ],
        "sceneObjects": [
          "预算表",
          "PPT 版本",
          "数据口径",
          "群聊确认",
          "附件",
          "工时记录"
        ],
        "contentVersion": "late-work.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "late-work.q.version-layout-lock": {
        "id": "late-work.q.version-layout-lock",
        "routeId": "late-work",
        "stage": 3,
        "prompt": "设计同事发来只读母版：字体、页码、封底别动，动了周一还得重套。 领导同时说周末先出一版。你怎么动？",
        "sourceRefs": [
          "LW-S05"
        ],
        "options": [
          {
            "id": "late-work.q.version-layout-lock.option.content-only",
            "label": "母版不动，我只改文字和数据区。",
            "intent": "normal",
            "stateTags": [
              "respectful-acceptance",
              "template-preserved"
            ],
            "sourceRefs": [
              "LW-S05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "母版不动，我只改文字和数据区。",
            "consequence": {
              "id": "late-work.q.version-layout-lock.option.content-only.consequence",
              "action": "版式稳定，数据区的责任人缺失变得更醒目",
              "npcReaction": "版式稳定，数据区的责任人缺失变得更醒目",
              "visibleStateChange": "版式稳定，数据区的责任人缺失变得更醒目 版式稳定，数据区的责任人缺失变得更醒目",
              "nextNodeId": "late-work.q.metric-owner"
            }
          },
          {
            "id": "late-work.q.version-layout-lock.option.working-copy",
            "label": "我另存工作版，保留原母版和修改时间。",
            "intent": "strategy",
            "stateTags": [
              "evidence-first",
              "working-copy-created"
            ],
            "sourceRefs": [
              "LW-S05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "我另存工作版，保留原母版和修改时间。",
            "consequence": {
              "id": "late-work.q.version-layout-lock.option.working-copy.consequence",
              "action": "工作版标出每张图的统计周期不一致",
              "npcReaction": "工作版标出每张图的统计周期不一致",
              "visibleStateChange": "工作版标出每张图的统计周期不一致 工作版标出每张图的统计周期不一致",
              "nextNodeId": "late-work.q.metric-window"
            }
          },
          {
            "id": "late-work.q.version-layout-lock.option.ask-editable",
            "label": "哪几页能改，您直接圈给我。",
            "intent": "boundary",
            "stateTags": [
              "reality-plan",
              "editable-range-confirmed"
            ],
            "sourceRefs": [
              "LW-S05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "哪几页能改，您直接圈给我。",
            "consequence": {
              "id": "late-work.q.version-layout-lock.option.ask-editable.consequence",
              "action": "设计同事圈出四页，其中一页的转化率公式没人确认",
              "npcReaction": "设计同事圈出四页，其中一页的转化率公式没人确认",
              "visibleStateChange": "设计同事圈出四页，其中一页的转化率公式没人确认 设计同事圈出四页，其中一页的转化率公式没人确认",
              "nextNodeId": "late-work.q.metric-definition"
            }
          },
          {
            "id": "late-work.q.version-layout-lock.option.red-tape",
            "label": "玩家确认奶蛙给锁定区贴红胶带，只在透明空位填内容",
            "intent": "absurd",
            "stateTags": [
              "object-logic",
              "template-preserved"
            ],
            "sourceRefs": [
              "LW-S05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "玩家确认奶蛙给锁定区贴红胶带，只在透明空位填内容",
            "consequence": {
              "id": "late-work.q.version-layout-lock.option.red-tape.consequence",
              "action": "胶带让缺数据的空位无法被漂亮图形遮住",
              "npcReaction": "胶带让缺数据的空位无法被漂亮图形遮住",
              "visibleStateChange": "胶带让缺数据的空位无法被漂亮图形遮住 胶带让缺数据的空位无法被漂亮图形遮住",
              "nextNodeId": "late-work.q.metric-placeholder"
            }
          }
        ],
        "sceneObjects": [
          "预算表",
          "PPT 版本",
          "数据口径",
          "群聊确认",
          "附件",
          "工时记录"
        ],
        "contentVersion": "late-work.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "late-work.q.version-forensic": {
        "id": "late-work.q.version-forensic",
        "routeId": "late-work",
        "stage": 3,
        "prompt": "云盘、群附件和本地桌面各有一份“最终版”，修改者也不同。你先做哪种取证动作？",
        "sourceRefs": [
          "LW-S05"
        ],
        "options": [
          {
            "id": "late-work.q.version-forensic.option.map-owner",
            "label": "我列文件名、时间、修改人，请大家认领。",
            "intent": "strategy",
            "stateTags": [
              "evidence-first",
              "version-map-created"
            ],
            "sourceRefs": [
              "LW-S05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "我列文件名、时间、修改人，请大家认领。",
            "consequence": {
              "id": "late-work.q.version-forensic.option.map-owner.consequence",
              "action": "认领表显示数据页来自业务、封面来自设计、总数来自财务",
              "npcReaction": "认领表显示数据页来自业务、封面来自设计、总数来自财务",
              "visibleStateChange": "认领表显示数据页来自业务、封面来自设计、总数来自财务 认领表显示数据页来自业务、封面来自设计、总数来自财务",
              "nextNodeId": "late-work.q.metric-owner"
            }
          },
          {
            "id": "late-work.q.version-forensic.option.restore-cloud",
            "label": "以云端版本史为准，其他都只读保留。",
            "intent": "normal",
            "stateTags": [
              "reality-plan",
              "cloud-history-used"
            ],
            "sourceRefs": [
              "LW-S05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "以云端版本史为准，其他都只读保留。",
            "consequence": {
              "id": "late-work.q.version-forensic.option.restore-cloud.consequence",
              "action": "恢复点保住了内容，也暴露一张图用了滚动 90 天",
              "npcReaction": "恢复点保住了内容，也暴露一张图用了滚动 90 天",
              "visibleStateChange": "恢复点保住了内容，也暴露一张图用了滚动 90 天 恢复点保住了内容，也暴露一张图用了滚动 90 天",
              "nextNodeId": "late-work.q.metric-window"
            }
          },
          {
            "id": "late-work.q.version-forensic.option.three-slide-diff",
            "label": "我只发三页差异，请领导选，不先合并。",
            "intent": "boundary",
            "stateTags": [
              "priority-coordination",
              "decision-escalated"
            ],
            "sourceRefs": [
              "LW-S05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "我只发三页差异，请领导选，不先合并。",
            "consequence": {
              "id": "late-work.q.version-forensic.option.three-slide-diff.consequence",
              "action": "领导选中一页，却反问`这个转化率怎么算的？`",
              "npcReaction": "领导选中一页，却反问`这个转化率怎么算的？`",
              "visibleStateChange": "领导选中一页，却反问`这个转化率怎么算的？` 领导选中一页，却反问`这个转化率怎么算的？`",
              "nextNodeId": "late-work.q.metric-definition"
            }
          },
          {
            "id": "late-work.q.version-forensic.option.stop-breeding",
            "label": "玩家确认奶蛙把冲突文件改为只读副本，并在工作版写`请停止繁殖`",
            "intent": "absurd",
            "stateTags": [
              "object-logic",
              "version-freeze"
            ],
            "sourceRefs": [
              "LW-S05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "玩家确认奶蛙把冲突文件改为只读副本，并在工作版写`请停止繁殖`",
            "consequence": {
              "id": "late-work.q.version-forensic.option.stop-breeding.consequence",
              "action": "文件停止增殖后，缺数页只剩一个待确认格",
              "npcReaction": "文件停止增殖后，缺数页只剩一个待确认格",
              "visibleStateChange": "文件停止增殖后，缺数页只剩一个待确认格 文件停止增殖后，缺数页只剩一个待确认格",
              "nextNodeId": "late-work.q.metric-placeholder"
            }
          }
        ],
        "sceneObjects": [
          "预算表",
          "PPT 版本",
          "数据口径",
          "群聊确认",
          "附件",
          "工时记录"
        ],
        "contentVersion": "late-work.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "late-work.q.metric-owner": {
        "id": "late-work.q.metric-owner",
        "routeId": "late-work",
        "stage": 4,
        "prompt": "同一个总量，财务表是 82，CRM 是 79，业务群里说 85。客户会看到哪一个？",
        "sourceRefs": [
          "LW-S06"
        ],
        "options": [
          {
            "id": "late-work.q.metric-owner.option.name-owner",
            "label": "先请领导指定这页的数据负责人，我等确认数。",
            "intent": "normal",
            "stateTags": [
              "evidence-first",
              "data-owner-requested"
            ],
            "sourceRefs": [
              "LW-S06"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "先请领导指定这页的数据负责人，我等确认数。",
            "consequence": {
              "id": "late-work.q.metric-owner.option.name-owner.consequence",
              "action": "财务被指定为 owner，客户随后追问`82 的原表在哪？`",
              "npcReaction": "财务被指定为 owner，客户随后追问`82 的原表在哪？`",
              "visibleStateChange": "财务被指定为 owner，客户随后追问`82 的原表在哪？` 财务被指定为 owner，客户随后追问`82 的原表在哪？`",
              "nextNodeId": "late-work.q.client-source"
            }
          },
          {
            "id": "late-work.q.metric-owner.option.finance-source",
            "label": "先用财务的 82，页脚写来源和周五更新时间。",
            "intent": "strategy",
            "stateTags": [
              "reality-plan",
              "source-labeled"
            ],
            "sourceRefs": [
              "LW-S06"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "先用财务的 82，页脚写来源和周五更新时间。",
            "consequence": {
              "id": "late-work.q.metric-owner.option.finance-source.consequence",
              "action": "数字有出处，但客户说自己要的是全国，不是华东",
              "npcReaction": "数字有出处，但客户说自己要的是全国，不是华东",
              "visibleStateChange": "数字有出处，但客户说自己要的是全国，不是华东 数字有出处，但客户说自己要的是全国，不是华东",
              "nextNodeId": "late-work.q.client-scope"
            }
          },
          {
            "id": "late-work.q.metric-owner.option.show-range",
            "label": "先写 79–85，注明三方待对齐，不装成一个精确数。",
            "intent": "boundary",
            "stateTags": [
              "limited-commitment",
              "range-shown"
            ],
            "sourceRefs": [
              "LW-S06"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "先写 79–85，注明三方待对齐，不装成一个精确数。",
            "consequence": {
              "id": "late-work.q.metric-owner.option.show-range.consequence",
              "action": "诚实范围进入 PPT，但客户打开的是仍写 79 的旧附件",
              "npcReaction": "诚实范围进入 PPT，但客户打开的是仍写 79 的旧附件",
              "visibleStateChange": "诚实范围进入 PPT，但客户打开的是仍写 79 的旧附件 诚实范围进入 PPT，但客户打开的是仍写 79 的旧附件",
              "nextNodeId": "late-work.q.client-version"
            }
          },
          {
            "id": "late-work.q.metric-owner.option.number-scale",
            "label": "玩家确认奶蛙把 79、82、85 三张数字卡放上秤，卡片背面写各自 owner",
            "intent": "absurd",
            "stateTags": [
              "object-logic",
              "conflict-visible"
            ],
            "sourceRefs": [
              "LW-S06"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "玩家确认奶蛙把 79、82、85 三张数字卡放上秤，卡片背面写各自 owner",
            "consequence": {
              "id": "late-work.q.metric-owner.option.number-scale.consequence",
              "action": "秤没有替人拍板；客户要求周日中午前补齐五页解释",
              "npcReaction": "秤没有替人拍板；客户要求周日中午前补齐五页解释",
              "visibleStateChange": "秤没有替人拍板；客户要求周日中午前补齐五页解释 秤没有替人拍板；客户要求周日中午前补齐五页解释",
              "nextNodeId": "late-work.q.client-deadline"
            }
          }
        ],
        "sceneObjects": [
          "预算表",
          "PPT 版本",
          "数据口径",
          "群聊确认",
          "附件",
          "工时记录"
        ],
        "contentVersion": "late-work.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "late-work.q.metric-window": {
        "id": "late-work.q.metric-window",
        "routeId": "late-work",
        "stage": 4,
        "prompt": "客户说近三个月。现有图一张按自然季度，一张按滚动 90 天。你怎么定义？",
        "sourceRefs": [
          "LW-S06"
        ],
        "options": [
          {
            "id": "late-work.q.metric-window.option.ask-window",
            "label": "确认一下：自然季度，还是截至今天往前 90 天？",
            "intent": "strategy",
            "stateTags": [
              "evidence-first",
              "window-requested"
            ],
            "sourceRefs": [
              "LW-S06"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "确认一下：自然季度，还是截至今天往前 90 天？",
            "consequence": {
              "id": "late-work.q.metric-window.option.ask-window.consequence",
              "action": "客户选滚动 90 天，随后要看原始来源",
              "npcReaction": "客户选滚动 90 天，随后要看原始来源",
              "visibleStateChange": "客户选滚动 90 天，随后要看原始来源 客户选滚动 90 天，随后要看原始来源",
              "nextNodeId": "late-work.q.client-source"
            }
          },
          {
            "id": "late-work.q.metric-window.option.calendar-label",
            "label": "先按自然季度做，并把日期范围写全。",
            "intent": "normal",
            "stateTags": [
              "respectful-acceptance",
              "window-labeled"
            ],
            "sourceRefs": [
              "LW-S06"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "先按自然季度做，并把日期范围写全。",
            "consequence": {
              "id": "late-work.q.metric-window.option.calendar-label.consequence",
              "action": "日期写清后，客户指出范围应是全国",
              "npcReaction": "日期写清后，客户指出范围应是全国",
              "visibleStateChange": "日期写清后，客户指出范围应是全国 日期写清后，客户指出范围应是全国",
              "nextNodeId": "late-work.q.client-scope"
            }
          },
          {
            "id": "late-work.q.metric-window.option.show-both",
            "label": "两种口径并排，让客户选用于正文的一张。",
            "intent": "boundary",
            "stateTags": [
              "reality-plan",
              "comparison-visible"
            ],
            "sourceRefs": [
              "LW-S06"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "两种口径并排，让客户选用于正文的一张。",
            "consequence": {
              "id": "late-work.q.metric-window.option.show-both.consequence",
              "action": "客户选中滚动 90 天，却在旧版本里仍看到自然季度",
              "npcReaction": "客户选中滚动 90 天，却在旧版本里仍看到自然季度",
              "visibleStateChange": "客户选中滚动 90 天，却在旧版本里仍看到自然季度 客户选中滚动 90 天，却在旧版本里仍看到自然季度",
              "nextNodeId": "late-work.q.client-version"
            }
          },
          {
            "id": "late-work.q.metric-window.option.timeline-strip",
            "label": "玩家确认奶蛙把 90 天做成一条可移动时间带，固定起止日期",
            "intent": "absurd",
            "stateTags": [
              "object-logic",
              "window-visible"
            ],
            "sourceRefs": [
              "LW-S06"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "玩家确认奶蛙把 90 天做成一条可移动时间带，固定起止日期",
            "consequence": {
              "id": "late-work.q.metric-window.option.timeline-strip.consequence",
              "action": "时间带堵住偷换区间的路，客户转而加要五页拆分",
              "npcReaction": "时间带堵住偷换区间的路，客户转而加要五页拆分",
              "visibleStateChange": "时间带堵住偷换区间的路，客户转而加要五页拆分 时间带堵住偷换区间的路，客户转而加要五页拆分",
              "nextNodeId": "late-work.q.client-deadline"
            }
          }
        ],
        "sceneObjects": [
          "预算表",
          "PPT 版本",
          "数据口径",
          "群聊确认",
          "附件",
          "工时记录"
        ],
        "contentVersion": "late-work.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "late-work.q.metric-definition": {
        "id": "late-work.q.metric-definition",
        "routeId": "late-work",
        "stage": 4,
        "prompt": "标题写转化率，但分母可能是线索、有效商机或已付款客户。现在填哪一个？",
        "sourceRefs": [
          "LW-S06"
        ],
        "options": [
          {
            "id": "late-work.q.metric-definition.option.ask-denominator",
            "label": "这页分母用线索、有效商机还是已付款？请确认一个。",
            "intent": "strategy",
            "stateTags": [
              "evidence-first",
              "denominator-requested"
            ],
            "sourceRefs": [
              "LW-S06"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "这页分母用线索、有效商机还是已付款？请确认一个。",
            "consequence": {
              "id": "late-work.q.metric-definition.option.ask-denominator.consequence",
              "action": "业务确认有效商机，客户下一句要原表",
              "npcReaction": "业务确认有效商机，客户下一句要原表",
              "visibleStateChange": "业务确认有效商机，客户下一句要原表 业务确认有效商机，客户下一句要原表",
              "nextNodeId": "late-work.q.client-source"
            }
          },
          {
            "id": "late-work.q.metric-definition.option.crm-field",
            "label": "先按 CRM 现有字段算，页脚写公式。",
            "intent": "normal",
            "stateTags": [
              "reality-plan",
              "formula-labeled"
            ],
            "sourceRefs": [
              "LW-S06"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "先按 CRM 现有字段算，页脚写公式。",
            "consequence": {
              "id": "late-work.q.metric-definition.option.crm-field.consequence",
              "action": "公式可查，但客户发现字段只覆盖华东",
              "npcReaction": "公式可查，但客户发现字段只覆盖华东",
              "visibleStateChange": "公式可查，但客户发现字段只覆盖华东 公式可查，但客户发现字段只覆盖华东",
              "nextNodeId": "late-work.q.client-scope"
            }
          },
          {
            "id": "late-work.q.metric-definition.option.formula-note",
            "label": "正文先写待确认，小字放三种公式，不替业务拍板。",
            "intent": "boundary",
            "stateTags": [
              "limited-commitment",
              "definition-pending"
            ],
            "sourceRefs": [
              "LW-S06"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "正文先写待确认，小字放三种公式，不替业务拍板。",
            "consequence": {
              "id": "late-work.q.metric-definition.option.formula-note.consequence",
              "action": "三个公式保住上下文，旧附件却只剩一个数字",
              "npcReaction": "三个公式保住上下文，旧附件却只剩一个数字",
              "visibleStateChange": "三个公式保住上下文，旧附件却只剩一个数字 三个公式保住上下文，旧附件却只剩一个数字",
              "nextNodeId": "late-work.q.client-version"
            }
          },
          {
            "id": "late-work.q.metric-definition.option.three-jars",
            "label": "玩家确认奶蛙摆三只透明罐：`线索`、`商机`、`付款`，停止混装",
            "intent": "absurd",
            "stateTags": [
              "object-logic",
              "denominator-visible"
            ],
            "sourceRefs": [
              "LW-S06"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "玩家确认奶蛙摆三只透明罐：`线索`、`商机`、`付款`，停止混装",
            "consequence": {
              "id": "late-work.q.metric-definition.option.three-jars.consequence",
              "action": "分母问题无法再藏，客户要求周日补五页说明",
              "npcReaction": "分母问题无法再藏，客户要求周日补五页说明",
              "visibleStateChange": "分母问题无法再藏，客户要求周日补五页说明 分母问题无法再藏，客户要求周日补五页说明",
              "nextNodeId": "late-work.q.client-deadline"
            }
          }
        ],
        "sceneObjects": [
          "预算表",
          "PPT 版本",
          "数据口径",
          "群聊确认",
          "附件",
          "工时记录"
        ],
        "contentVersion": "late-work.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "late-work.q.metric-placeholder": {
        "id": "late-work.q.metric-placeholder",
        "routeId": "late-work",
        "stage": 4,
        "prompt": "业务说最终数据周一才出，周末谁也给不了确定数。PPT 这一格怎么办？",
        "sourceRefs": [
          "LW-S03",
          "LW-S06"
        ],
        "options": [
          {
            "id": "late-work.q.metric-placeholder.option.owner-deadline",
            "label": "留“待业务确认”，写负责人和最晚回填时间。",
            "intent": "strategy",
            "stateTags": [
              "evidence-first",
              "placeholder-owned"
            ],
            "sourceRefs": [
              "LW-S03",
              "LW-S06"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "留“待业务确认”，写负责人和最晚回填时间。",
            "consequence": {
              "id": "late-work.q.metric-placeholder.option.owner-deadline.consequence",
              "action": "空格有了 owner，客户随后直接问数据来源",
              "npcReaction": "空格有了 owner，客户随后直接问数据来源",
              "visibleStateChange": "空格有了 owner，客户随后直接问数据来源 空格有了 owner，客户随后直接问数据来源",
              "nextNodeId": "late-work.q.client-source"
            }
          },
          {
            "id": "late-work.q.metric-placeholder.option.last-confirmed",
            "label": "用上期确认数，明确写截至日期，不冒充最新。",
            "intent": "normal",
            "stateTags": [
              "reality-plan",
              "stale-data-labeled"
            ],
            "sourceRefs": [
              "LW-S03",
              "LW-S06"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "用上期确认数，明确写截至日期，不冒充最新。",
            "consequence": {
              "id": "late-work.q.metric-placeholder.option.last-confirmed.consequence",
              "action": "日期诚实可见，客户指出自己要全国范围",
              "npcReaction": "日期诚实可见，客户指出自己要全国范围",
              "visibleStateChange": "日期诚实可见，客户指出自己要全国范围 日期诚实可见，客户指出自己要全国范围",
              "nextNodeId": "late-work.q.client-scope"
            }
          },
          {
            "id": "late-work.q.metric-placeholder.option.remove-chart",
            "label": "删掉无来源图，结论改成条件句。",
            "intent": "boundary",
            "stateTags": [
              "hard-boundary",
              "unsupported-chart-removed"
            ],
            "sourceRefs": [
              "LW-S03",
              "LW-S06"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "删掉无来源图，结论改成条件句。",
            "consequence": {
              "id": "late-work.q.metric-placeholder.option.remove-chart.consequence",
              "action": "错误风险下降，但客户旧附件里仍保留那张图",
              "npcReaction": "错误风险下降，但客户旧附件里仍保留那张图",
              "visibleStateChange": "错误风险下降，但客户旧附件里仍保留那张图 错误风险下降，但客户旧附件里仍保留那张图",
              "nextNodeId": "late-work.q.client-version"
            }
          },
          {
            "id": "late-work.q.metric-placeholder.option.no-imagination-tape",
            "label": "玩家确认奶蛙给空格贴透明封条：`数据未到，禁止脑补`",
            "intent": "absurd",
            "stateTags": [
              "object-logic",
              "no-fabrication"
            ],
            "sourceRefs": [
              "LW-S03",
              "LW-S06"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "玩家确认奶蛙给空格贴透明封条：`数据未到，禁止脑补`",
            "consequence": {
              "id": "late-work.q.metric-placeholder.option.no-imagination-tape.consequence",
              "action": "封条挡住假数字，客户改要五页结构框架",
              "npcReaction": "封条挡住假数字，客户改要五页结构框架",
              "visibleStateChange": "封条挡住假数字，客户改要五页结构框架 封条挡住假数字，客户改要五页结构框架",
              "nextNodeId": "late-work.q.client-deadline"
            }
          }
        ],
        "sceneObjects": [
          "预算表",
          "PPT 版本",
          "数据口径",
          "群聊确认",
          "附件",
          "工时记录"
        ],
        "contentVersion": "late-work.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "late-work.q.client-source": {
        "id": "late-work.q.client-source",
        "routeId": "late-work",
        "stage": 5,
        "prompt": "周日，客户在群里问：这页 37% 从哪来的？ 领导也在群里。你怎么处理？",
        "sourceRefs": [
          "LW-S03",
          "LW-S06"
        ],
        "options": [
          {
            "id": "late-work.q.client-source.option.attach-proof",
            "label": "来自财务周五确认表。我把原表、口径和更新时间一起发。",
            "intent": "strategy",
            "stateTags": [
              "evidence-first",
              "source-proof-attached"
            ],
            "sourceRefs": [
              "LW-S03",
              "LW-S06"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "来自财务周五确认表。我把原表、口径和更新时间一起发。",
            "consequence": {
              "id": "late-work.q.client-source.option.attach-proof.consequence",
              "action": "客户能复核，领导说`下次别等人问才放来源`",
              "npcReaction": "客户能复核，领导说`下次别等人问才放来源`",
              "visibleStateChange": "客户能复核，领导说`下次别等人问才放来源` 客户能复核，领导说`下次别等人问才放来源`",
              "nextNodeId": "late-work.q.rule-next-time"
            }
          },
          {
            "id": "late-work.q.client-source.option.withdraw-page",
            "label": "这页先撤，确认后补，不拿不确定数顶着。",
            "intent": "boundary",
            "stateTags": [
              "hard-boundary",
              "page-withdrawn"
            ],
            "sourceRefs": [
              "LW-S03",
              "LW-S06"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "这页先撤，确认后补，不拿不确定数顶着。",
            "consequence": {
              "id": "late-work.q.client-source.option.withdraw-page.consequence",
              "action": "客户继续看其他页，37% 留在待确认清单；本局进入结算",
              "npcReaction": "客户继续看其他页，37% 留在待确认清单；本局进入结算",
              "visibleStateChange": "客户继续看其他页，37% 留在待确认清单；本局进入结算 客户继续看其他页，37% 留在待确认清单；本局进入结算",
              "nextNodeId": "result"
            }
          },
          {
            "id": "late-work.q.client-source.option.list-differences",
            "label": "现在有三套口径，我先列差异，请您确认要看的那套。",
            "intent": "normal",
            "stateTags": [
              "reality-plan",
              "definition-choice-opened"
            ],
            "sourceRefs": [
              "LW-S03",
              "LW-S06"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "现在有三套口径，我先列差异，请您确认要看的那套。",
            "consequence": {
              "id": "late-work.q.client-source.option.list-differences.consequence",
              "action": "客户选出口径，责任回到数据 owner；本局进入结算",
              "npcReaction": "客户选出口径，责任回到数据 owner；本局进入结算",
              "visibleStateChange": "客户选出口径，责任回到数据 owner；本局进入结算 客户选出口径，责任回到数据 owner；本局进入结算",
              "nextNodeId": "result"
            }
          },
          {
            "id": "late-work.q.client-source.option.birth-certificate",
            "label": "玩家确认奶蛙给 37% 配一张`数字出生证明`：来源、时间、计算人",
            "intent": "absurd",
            "stateTags": [
              "object-logic",
              "provenance-visible"
            ],
            "sourceRefs": [
              "LW-S03",
              "LW-S06"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "玩家确认奶蛙给 37% 配一张`数字出生证明`：来源、时间、计算人",
            "consequence": {
              "id": "late-work.q.client-source.option.birth-certificate.consequence",
              "action": "附件不再像野生数字，客户回了一个`收到`；本局进入结算",
              "npcReaction": "附件不再像野生数字，客户回了一个`收到`；本局进入结算",
              "visibleStateChange": "附件不再像野生数字，客户回了一个`收到`；本局进入结算 附件不再像野生数字，客户回了一个`收到`；本局进入结算",
              "nextNodeId": "result"
            }
          }
        ],
        "sceneObjects": [
          "预算表",
          "PPT 版本",
          "数据口径",
          "群聊确认",
          "附件",
          "工时记录"
        ],
        "contentVersion": "late-work.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "late-work.q.client-scope": {
        "id": "late-work.q.client-scope",
        "routeId": "late-work",
        "stage": 5,
        "prompt": "客户问：我说的是全国，你们怎么只放华东？ 原消息里只写过区域表现。你怎么接？",
        "sourceRefs": [
          "LW-S01",
          "LW-S06"
        ],
        "options": [
          {
            "id": "late-work.q.client-scope.option.own-and-expand",
            "label": "范围之前没写清。我今晚补全国，华东保留作对比。",
            "intent": "normal",
            "stateTags": [
              "respectful-acceptance",
              "scope-expanded"
            ],
            "sourceRefs": [
              "LW-S01",
              "LW-S06"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "范围之前没写清。我今晚补全国，华东保留作对比。",
            "consequence": {
              "id": "late-work.q.client-scope.option.own-and-expand.consequence",
              "action": "客户接受处理方案，领导问`下次范围怎么一次说清`",
              "npcReaction": "客户接受处理方案，领导问`下次范围怎么一次说清`",
              "visibleStateChange": "客户接受处理方案，领导问`下次范围怎么一次说清` 客户接受处理方案，领导问`下次范围怎么一次说清`",
              "nextNodeId": "late-work.q.rule-next-time"
            }
          },
          {
            "id": "late-work.q.client-scope.option.show-record",
            "label": "原确认记录写的是“区域表现”。我先发记录，请您定是否扩到全国。",
            "intent": "strategy",
            "stateTags": [
              "evidence-first",
              "scope-record-shown"
            ],
            "sourceRefs": [
              "LW-S01",
              "LW-S06"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "原确认记录写的是“区域表现”。我先发记录，请您定是否扩到全国。",
            "consequence": {
              "id": "late-work.q.client-scope.option.show-record.consequence",
              "action": "记录避免单方背锅，客户明确了全国；本局进入结算",
              "npcReaction": "记录避免单方背锅，客户明确了全国；本局进入结算",
              "visibleStateChange": "记录避免单方背锅，客户明确了全国；本局进入结算 记录避免单方背锅，客户明确了全国；本局进入结算",
              "nextNodeId": "result"
            }
          },
          {
            "id": "late-work.q.client-scope.option.data-boundary",
            "label": "全国数据周一才齐，现在只能交有来源的华东。",
            "intent": "boundary",
            "stateTags": [
              "hard-boundary",
              "unsupported-scope-refused"
            ],
            "sourceRefs": [
              "LW-S01",
              "LW-S06"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "全国数据周一才齐，现在只能交有来源的华东。",
            "consequence": {
              "id": "late-work.q.client-scope.option.data-boundary.consequence",
              "action": "客户把全国页延到周一，周末不再造数；本局进入结算",
              "npcReaction": "客户把全国页延到周一，周末不再造数；本局进入结算",
              "visibleStateChange": "客户把全国页延到周一，周末不再造数；本局进入结算 客户把全国页延到周一，周末不再造数；本局进入结算",
              "nextNodeId": "result"
            }
          },
          {
            "id": "late-work.q.client-scope.option.map-stickers",
            "label": "玩家确认奶蛙把华东贴纸从地图上揭下，旁边排`待解锁 24 省`",
            "intent": "absurd",
            "stateTags": [
              "object-logic",
              "scope-gap-visible"
            ],
            "sourceRefs": [
              "LW-S01",
              "LW-S06"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "玩家确认奶蛙把华东贴纸从地图上揭下，旁边排`待解锁 24 省`",
            "consequence": {
              "id": "late-work.q.client-scope.option.map-stickers.consequence",
              "action": "客户看见缺口不是一键放大，改为先审华东；本局进入结算",
              "npcReaction": "客户看见缺口不是一键放大，改为先审华东；本局进入结算",
              "visibleStateChange": "客户看见缺口不是一键放大，改为先审华东；本局进入结算 客户看见缺口不是一键放大，改为先审华东；本局进入结算",
              "nextNodeId": "result"
            }
          }
        ],
        "sceneObjects": [
          "预算表",
          "PPT 版本",
          "数据口径",
          "群聊确认",
          "附件",
          "工时记录"
        ],
        "contentVersion": "late-work.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "late-work.q.client-version": {
        "id": "late-work.q.client-version",
        "routeId": "late-work",
        "stage": 5,
        "prompt": "客户说：我打开的还是 79，你们群里怎么又是 82？ 群里已经有四个附件。下一步？",
        "sourceRefs": [
          "LW-S05"
        ],
        "options": [
          {
            "id": "late-work.q.client-version.option.one-link",
            "label": "我重发唯一链接，旧附件全部标作废。",
            "intent": "boundary",
            "stateTags": [
              "reality-plan",
              "single-source-link"
            ],
            "sourceRefs": [
              "LW-S05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "我重发唯一链接，旧附件全部标作废。",
            "consequence": {
              "id": "late-work.q.client-version.option.one-link.consequence",
              "action": "群里只剩一个可编辑入口，领导问`以后怎么防止四份并行`",
              "npcReaction": "群里只剩一个可编辑入口，领导问`以后怎么防止四份并行`",
              "visibleStateChange": "群里只剩一个可编辑入口，领导问`以后怎么防止四份并行` 群里只剩一个可编辑入口，领导问`以后怎么防止四份并行`",
              "nextNodeId": "late-work.q.rule-next-time"
            }
          },
          {
            "id": "late-work.q.client-version.option.ask-filename",
            "label": "先确认您打开的文件名和时间，我不盲改第五份。",
            "intent": "strategy",
            "stateTags": [
              "evidence-first",
              "opened-version-requested"
            ],
            "sourceRefs": [
              "LW-S05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "先确认您打开的文件名和时间，我不盲改第五份。",
            "consequence": {
              "id": "late-work.q.client-version.option.ask-filename.consequence",
              "action": "客户发来文件名，旧附件被准确定位；本局进入结算",
              "npcReaction": "客户发来文件名，旧附件被准确定位；本局进入结算",
              "visibleStateChange": "客户发来文件名，旧附件被准确定位；本局进入结算 客户发来文件名，旧附件被准确定位；本局进入结算",
              "nextNodeId": "result"
            }
          },
          {
            "id": "late-work.q.client-version.option.diff-no-blame",
            "label": "我发一张版本对照，只写差异和有效版本，不在群里甩锅。",
            "intent": "normal",
            "stateTags": [
              "respectful-acceptance",
              "version-diff-shown"
            ],
            "sourceRefs": [
              "LW-S05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "我发一张版本对照，只写差异和有效版本，不在群里甩锅。",
            "consequence": {
              "id": "late-work.q.client-version.option.diff-no-blame.consequence",
              "action": "客户切到有效版本，群里没人被公开处刑；本局进入结算",
              "npcReaction": "客户切到有效版本，群里没人被公开处刑；本局进入结算",
              "visibleStateChange": "客户切到有效版本，群里没人被公开处刑；本局进入结算 客户切到有效版本，群里没人被公开处刑；本局进入结算",
              "nextNodeId": "result"
            }
          },
          {
            "id": "late-work.q.client-version.option.retired-stamp",
            "label": "玩家确认奶蛙给三个过期附件盖`已退役`，装进只读档案袋",
            "intent": "absurd",
            "stateTags": [
              "object-logic",
              "legacy-version-isolated"
            ],
            "sourceRefs": [
              "LW-S05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "玩家确认奶蛙给三个过期附件盖`已退役`，装进只读档案袋",
            "consequence": {
              "id": "late-work.q.client-version.option.retired-stamp.consequence",
              "action": "过期附件仍可追溯但不能再冒充当前稿；本局进入结算",
              "npcReaction": "过期附件仍可追溯但不能再冒充当前稿；本局进入结算",
              "visibleStateChange": "过期附件仍可追溯但不能再冒充当前稿；本局进入结算 过期附件仍可追溯但不能再冒充当前稿；本局进入结算",
              "nextNodeId": "result"
            }
          }
        ],
        "sceneObjects": [
          "预算表",
          "PPT 版本",
          "数据口径",
          "群聊确认",
          "附件",
          "工时记录"
        ],
        "contentVersion": "late-work.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "late-work.q.client-deadline": {
        "id": "late-work.q.client-deadline",
        "routeId": "late-work",
        "stage": 5,
        "prompt": "客户追加：明天中午前再补五页，全国、竞品、趋势、原因、建议。 数据还没齐。你怎么答？",
        "sourceRefs": [
          "LW-S01",
          "LW-S03",
          "LW-S06"
        ],
        "options": [
          {
            "id": "late-work.q.client-deadline.option.trade-scope",
            "label": "可以先补五页框架，但原定版式优化后移；数据到一页填一页。",
            "intent": "strategy",
            "stateTags": [
              "priority-coordination",
              "scope-tradeoff"
            ],
            "sourceRefs": [
              "LW-S01",
              "LW-S03",
              "LW-S06"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "可以先补五页框架，但原定版式优化后移；数据到一页填一页。",
            "consequence": {
              "id": "late-work.q.client-deadline.option.trade-scope.consequence",
              "action": "客户接受先看框架，领导问`下次怎么提前暴露依赖`",
              "npcReaction": "客户接受先看框架，领导问`下次怎么提前暴露依赖`",
              "visibleStateChange": "客户接受先看框架，领导问`下次怎么提前暴露依赖` 客户接受先看框架，领导问`下次怎么提前暴露依赖`",
              "nextNodeId": "late-work.q.rule-next-time"
            }
          },
          {
            "id": "late-work.q.client-deadline.option.real-time",
            "label": "明天中午做不了，最早周日 18 点。",
            "intent": "boundary",
            "stateTags": [
              "hard-boundary",
              "deadline-reset"
            ],
            "sourceRefs": [
              "LW-S01",
              "LW-S03",
              "LW-S06"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "明天中午做不了，最早周日 18 点。",
            "consequence": {
              "id": "late-work.q.client-deadline.option.real-time.consequence",
              "action": "客户选择 18 点，不再把愿望当工时；本局进入结算",
              "npcReaction": "客户选择 18 点，不再把愿望当工时；本局进入结算",
              "visibleStateChange": "客户选择 18 点，不再把愿望当工时；本局进入结算 客户选择 18 点，不再把愿望当工时；本局进入结算",
              "nextNodeId": "result"
            }
          },
          {
            "id": "late-work.q.client-deadline.option.require-owners",
            "label": "请先给三项数据负责人；没有来源，我只能交结构。",
            "intent": "normal",
            "stateTags": [
              "reality-plan",
              "dependency-required"
            ],
            "sourceRefs": [
              "LW-S01",
              "LW-S03",
              "LW-S06"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "请先给三项数据负责人；没有来源，我只能交结构。",
            "consequence": {
              "id": "late-work.q.client-deadline.option.require-owners.consequence",
              "action": "两名 owner 被拉进群，一项仍明确留空；本局进入结算",
              "npcReaction": "两名 owner 被拉进群，一项仍明确留空；本局进入结算",
              "visibleStateChange": "两名 owner 被拉进群，一项仍明确留空；本局进入结算 两名 owner 被拉进群，一项仍明确留空；本局进入结算",
              "nextNodeId": "result"
            }
          },
          {
            "id": "late-work.q.client-deadline.option.waiting-room",
            "label": "玩家确认奶蛙把五张空白页摆成候诊区：谁的数据到，谁先叫号",
            "intent": "absurd",
            "stateTags": [
              "object-logic",
              "dependency-visible"
            ],
            "sourceRefs": [
              "LW-S01",
              "LW-S03",
              "LW-S06"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "玩家确认奶蛙把五张空白页摆成候诊区：谁的数据到，谁先叫号",
            "consequence": {
              "id": "late-work.q.client-deadline.option.waiting-room.consequence",
              "action": "五页没有同时“自动痊愈”，客户先审已有两页；本局进入结算",
              "npcReaction": "五页没有同时“自动痊愈”，客户先审已有两页；本局进入结算",
              "visibleStateChange": "五页没有同时“自动痊愈”，客户先审已有两页；本局进入结算 五页没有同时“自动痊愈”，客户先审已有两页；本局进入结算",
              "nextNodeId": "result"
            }
          }
        ],
        "sceneObjects": [
          "预算表",
          "PPT 版本",
          "数据口径",
          "群聊确认",
          "附件",
          "工时记录"
        ],
        "contentVersion": "late-work.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "late-work.q.rule-next-time": {
        "id": "late-work.q.rule-next-time",
        "routeId": "late-work",
        "stage": 6,
        "prompt": "周一客户会结束，领导说：这次先过了。下次临时任务怎么省点事？ 你留下哪条具体规则？",
        "sourceRefs": [
          "LW-S03",
          "LW-S04",
          "LW-S05",
          "LW-S06",
          "LW-S07"
        ],
        "options": [
          {
            "id": "late-work.q.rule-next-time.option.brief-card",
            "label": "以后开工前先写五项：逻辑、版式、数据、截止时间、负责人。",
            "intent": "strategy",
            "stateTags": [
              "evidence-first",
              "brief-template-created"
            ],
            "sourceRefs": [
              "LW-S03",
              "LW-S04",
              "LW-S05",
              "LW-S06",
              "LW-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "以后开工前先写五项：逻辑、版式、数据、截止时间、负责人。",
            "consequence": {
              "id": "late-work.q.rule-next-time.option.brief-card.consequence",
              "action": "一张五格需求卡被置顶，下次`弄一下`必须先落进格子；本局结算",
              "npcReaction": "一张五格需求卡被置顶，下次`弄一下`必须先落进格子；本局结算",
              "visibleStateChange": "一张五格需求卡被置顶，下次`弄一下`必须先落进格子；本局结算 一张五格需求卡被置顶，下次`弄一下`必须先落进格子；本局结算",
              "nextNodeId": "result"
            }
          },
          {
            "id": "late-work.q.rule-next-time.option.priority-owner",
            "label": "新活撞旧活时，由派活的人在群里定优先级。",
            "intent": "normal",
            "stateTags": [
              "priority-coordination",
              "priority-rule-created"
            ],
            "sourceRefs": [
              "LW-S03",
              "LW-S04",
              "LW-S05",
              "LW-S06",
              "LW-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "新活撞旧活时，由派活的人在群里定优先级。",
            "consequence": {
              "id": "late-work.q.rule-next-time.option.priority-owner.consequence",
              "action": "两个工位中间多了一道由负责人控制的闸门；本局结算",
              "npcReaction": "两个工位中间多了一道由负责人控制的闸门；本局结算",
              "visibleStateChange": "两个工位中间多了一道由负责人控制的闸门；本局结算 两个工位中间多了一道由负责人控制的闸门；本局结算",
              "nextNodeId": "result"
            }
          },
          {
            "id": "late-work.q.rule-next-time.option.time-rule",
            "label": "周末工作先确认时长和补休，别等周一回忆。",
            "intent": "boundary",
            "stateTags": [
              "time-compensation",
              "time-rule-created"
            ],
            "sourceRefs": [
              "LW-S03",
              "LW-S04",
              "LW-S05",
              "LW-S06",
              "LW-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "周末工作先确认时长和补休，别等周一回忆。",
            "consequence": {
              "id": "late-work.q.rule-next-time.option.time-rule.consequence",
              "action": "工时格与调休日历第一次连在一起，不再发行口头期货；本局结算",
              "npcReaction": "工时格与调休日历第一次连在一起，不再发行口头期货；本局结算",
              "visibleStateChange": "工时格与调休日历第一次连在一起，不再发行口头期货；本局结算 工时格与调休日历第一次连在一起，不再发行口头期货；本局结算",
              "nextNodeId": "result"
            }
          },
          {
            "id": "late-work.q.rule-next-time.option.three-buttons",
            "label": "玩家确认奶蛙在工位贴`弄一下前先选：逻辑 / 版式 / 数据`三键牌",
            "intent": "absurd",
            "stateTags": [
              "object-logic",
              "scope-rule-created"
            ],
            "sourceRefs": [
              "LW-S03",
              "LW-S04",
              "LW-S05",
              "LW-S06",
              "LW-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "玩家确认奶蛙在工位贴`弄一下前先选：逻辑 / 版式 / 数据`三键牌",
            "consequence": {
              "id": "late-work.q.rule-next-time.option.three-buttons.consequence",
              "action": "领导下次伸手派活前，先被三颗实体按钮拦住；本局结算",
              "npcReaction": "领导下次伸手派活前，先被三颗实体按钮拦住；本局结算",
              "visibleStateChange": "领导下次伸手派活前，先被三颗实体按钮拦住；本局结算 领导下次伸手派活前，先被三颗实体按钮拦住；本局结算",
              "nextNodeId": "result"
            }
          }
        ],
        "sceneObjects": [
          "预算表",
          "PPT 版本",
          "数据口径",
          "群聊确认",
          "附件",
          "工时记录"
        ],
        "contentVersion": "late-work.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      }
    },
    "canonicalPath": [
      "late-work.q.open-1743.option.accept",
      "late-work.q.scope-accepted.option.logic-first",
      "late-work.q.version-client.option.source-layer",
      "late-work.q.metric-owner.option.name-owner",
      "late-work.q.client-source.option.attach-proof",
      "late-work.q.rule-next-time.option.priority-owner"
    ]
  },
  "revived-friend": {
    "id": "revived-friend",
    "title": "熟人突然复活",
    "subtitle": "三年以上没联系的人突然翻到你的旧朋友圈",
    "contentVersion": "revived-friend.graph.preview.2026-07-22.v1",
    "startNodeId": "revived-friend.q.old-trace",
    "allowedSceneObjects": [
      "旧朋友圈",
      "共同好友",
      "请帖链接",
      "喜糖",
      "旧转账",
      "关系痕迹"
    ],
    "questions": {
      "revived-friend.q.old-trace": {
        "id": "revived-friend.q.old-trace",
        "routeId": "revived-friend",
        "stage": 1,
        "prompt": "周三 22:18，你看到 2019 年一条旧朋友圈多了新评论。那是毕业时拍的面馆门头，三年多没联系的旧同学问：这家还开吗？ 你怎么回应？",
        "sourceRefs": [
          "RF-S01",
          "RF-S02",
          "RF-S03"
        ],
        "options": [
          {
            "id": "revived-friend.q.old-trace.option.warm",
            "label": "你怎么翻到这条的？那家早关了。",
            "intent": "normal",
            "stateTags": [
              "warm-reopen",
              "old-trace-acknowledged"
            ],
            "sourceRefs": [
              "RF-S01",
              "RF-S02",
              "RF-S03"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "你怎么翻到这条的？那家早关了。",
            "consequence": {
              "id": "revived-friend.q.old-trace.option.warm.consequence",
              "action": "奶蛙把旧门头和“已关店”并排。",
              "npcReaction": "对方回：`搜店名翻到的，老周刚好也发了毕业照。`",
              "visibleStateChange": "奶蛙把旧门头和“已关店”并排。 对方回：`搜店名翻到的，老周刚好也发了毕业照。`",
              "nextNodeId": "revived-friend.q.mutual-warm"
            }
          },
          {
            "id": "revived-friend.q.old-trace.option.purpose",
            "label": "刚看到。你找我有事吗？",
            "intent": "strategy",
            "stateTags": [
              "purpose-first",
              "purpose-requested"
            ],
            "sourceRefs": [
              "RF-S01",
              "RF-S02",
              "RF-S03"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "刚看到。你找我有事吗？",
            "consequence": {
              "id": "revived-friend.q.old-trace.option.purpose.consequence",
              "action": "没有铺垫长寒暄。",
              "npcReaction": "对方回：`有事，先问你和老周还联系吗？`",
              "visibleStateChange": "没有铺垫长寒暄。 对方回：`有事，先问你和老周还联系吗？`",
              "nextNodeId": "revived-friend.q.mutual-purpose"
            }
          },
          {
            "id": "revived-friend.q.old-trace.option.mutual",
            "label": "老周也在问这家，是你们刚聊到？",
            "intent": "boundary",
            "stateTags": [
              "mutual-friend-check",
              "context-crosschecked"
            ],
            "sourceRefs": [
              "RF-S01",
              "RF-S02",
              "RF-S03"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "老周也在问这家，是你们刚聊到？",
            "consequence": {
              "id": "revived-friend.q.old-trace.option.mutual.consequence",
              "action": "老周的名字进入对话；几秒后老周单独发来：`他是不是找你了？`",
              "npcReaction": "老周的名字进入对话；几秒后老周单独发来：`他是不是找你了？`",
              "visibleStateChange": "老周的名字进入对话；几秒后老周单独发来：`他是不是找你了？` 老周的名字进入对话；几秒后老周单独发来：`他是不是找你了？`",
              "nextNodeId": "revived-friend.q.mutual-crosscheck"
            }
          },
          {
            "id": "revived-friend.q.old-trace.option.like-cancel",
            "label": "玩家确认奶蛙给对方 2018 年军训照点个赞，停两秒再取消，不追加消息",
            "intent": "absurd",
            "stateTags": [
              "ritual-object-logic",
              "player-confirmed-social-action"
            ],
            "sourceRefs": [
              "RF-S01",
              "RF-S02",
              "RF-S03"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "玩家确认奶蛙给对方 2018 年军训照点个赞，停两秒再取消，不追加消息",
            "consequence": {
              "id": "revived-friend.q.old-trace.option.like-cancel.consequence",
              "action": "奶蛙完成一次可见“考古回礼”，但不假设对方一定收到通知；对方继续说`最近整理旧硬盘，看到那张军训照`",
              "npcReaction": "奶蛙完成一次可见“考古回礼”，但不假设对方一定收到通知；对方继续说`最近整理旧硬盘，看到那张军训照`",
              "visibleStateChange": "奶蛙完成一次可见“考古回礼”，但不假设对方一定收到通知；对方继续说`最近整理旧硬盘，看到那张军训照` 奶蛙完成一次可见“考古回礼”，但不假设对方一定收到通知；对方继续说`最近整理旧硬盘，看到那张军训照`",
              "nextNodeId": "revived-friend.q.mutual-archaeology"
            }
          }
        ],
        "sceneObjects": [
          "旧朋友圈",
          "共同好友",
          "请帖链接",
          "喜糖",
          "旧转账",
          "关系痕迹"
        ],
        "contentVersion": "revived-friend.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "revived-friend.q.mutual-warm": {
        "id": "revived-friend.q.mutual-warm",
        "routeId": "revived-friend",
        "stage": 2,
        "prompt": "对方说：老周刚发了毕业照，我顺手搜到这家店。你们现在还常见？ 你准备让共同好友进入多少？",
        "sourceRefs": [
          "RF-S02",
          "RF-S07"
        ],
        "options": [
          {
            "id": "revived-friend.q.mutual-warm.option.direct",
            "label": "偶尔。你有事直接跟我说吧。",
            "intent": "normal",
            "stateTags": [
              "purpose-first",
              "direct-channel-requested"
            ],
            "sourceRefs": [
              "RF-S02",
              "RF-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "偶尔。你有事直接跟我说吧。",
            "consequence": {
              "id": "revived-friend.q.mutual-warm.option.direct.consequence",
              "action": "老周退出对话中心。",
              "npcReaction": "对方直接发来自己的电子请帖",
              "visibleStateChange": "老周退出对话中心。 对方直接发来自己的电子请帖",
              "nextNodeId": "revived-friend.q.invite-direct"
            }
          },
          {
            "id": "revived-friend.q.mutual-warm.option.ask-sharing",
            "label": "老周说到我哪些近况了？",
            "intent": "strategy",
            "stateTags": [
              "mutual-friend-check",
              "privacy-scope-requested"
            ],
            "sourceRefs": [
              "RF-S02",
              "RF-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "老周说到我哪些近况了？",
            "consequence": {
              "id": "revived-friend.q.mutual-warm.option.ask-sharing.consequence",
              "action": "对方说只知道你在本城；老周随后转来请帖链接",
              "npcReaction": "对方说只知道你在本城；老周随后转来请帖链接",
              "visibleStateChange": "对方说只知道你在本城；老周随后转来请帖链接 对方说只知道你在本城；老周随后转来请帖链接",
              "nextNodeId": "revived-friend.q.invite-via-mutual"
            }
          },
          {
            "id": "revived-friend.q.mutual-warm.option.date-first",
            "label": "先说你哪天有安排，我不一定能去。",
            "intent": "boundary",
            "stateTags": [
              "limited-open",
              "attendance-not-promised"
            ],
            "sourceRefs": [
              "RF-S02",
              "RF-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "先说你哪天有安排，我不一定能去。",
            "consequence": {
              "id": "revived-friend.q.mutual-warm.option.date-first.consequence",
              "action": "对方先给日期，补一句`来不了也没事`",
              "npcReaction": "对方先给日期，补一句`来不了也没事`",
              "visibleStateChange": "对方先给日期，补一句`来不了也没事` 对方先给日期，补一句`来不了也没事`",
              "nextNodeId": "revived-friend.q.invite-soft"
            }
          },
          {
            "id": "revived-friend.q.mutual-warm.option.local-meeting",
            "label": "玩家确认奶蛙只在本机摆出三张旧合照，标`本人 / 共同好友 / 未知目的`",
            "intent": "absurd",
            "stateTags": [
              "ritual-object-logic",
              "no-private-forwarding"
            ],
            "sourceRefs": [
              "RF-S02",
              "RF-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "玩家确认奶蛙只在本机摆出三张旧合照，标`本人 / 共同好友 / 未知目的`",
            "consequence": {
              "id": "revived-friend.q.mutual-warm.option.local-meeting.consequence",
              "action": "照片没有发给第三人；对方改用文字给出时间地点，不先塞链接",
              "npcReaction": "照片没有发给第三人；对方改用文字给出时间地点，不先塞链接",
              "visibleStateChange": "照片没有发给第三人；对方改用文字给出时间地点，不先塞链接 照片没有发给第三人；对方改用文字给出时间地点，不先塞链接",
              "nextNodeId": "revived-friend.q.invite-no-link"
            }
          }
        ],
        "sceneObjects": [
          "旧朋友圈",
          "共同好友",
          "请帖链接",
          "喜糖",
          "旧转账",
          "关系痕迹"
        ],
        "contentVersion": "revived-friend.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "revived-friend.q.mutual-purpose": {
        "id": "revived-friend.q.mutual-purpose",
        "routeId": "revived-friend",
        "stage": 2,
        "prompt": "对方直说：我下个月结婚。老周说你还在这边。 久未联系和婚礼邀请同时到达。你先回哪层？",
        "sourceRefs": [
          "RF-S03",
          "RF-S04",
          "RF-S07"
        ],
        "options": [
          {
            "id": "revived-friend.q.mutual-purpose.option.congrats-date",
            "label": "恭喜。哪天？",
            "intent": "normal",
            "stateTags": [
              "warm-reopen",
              "date-requested"
            ],
            "sourceRefs": [
              "RF-S03",
              "RF-S04",
              "RF-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "恭喜。哪天？",
            "consequence": {
              "id": "revived-friend.q.mutual-purpose.option.congrats-date.consequence",
              "action": "对方发来本人制作的 H5 请帖",
              "npcReaction": "对方发来本人制作的 H5 请帖",
              "visibleStateChange": "对方发来本人制作的 H5 请帖 对方发来本人制作的 H5 请帖",
              "nextNodeId": "revived-friend.q.invite-direct"
            }
          },
          {
            "id": "revived-friend.q.mutual-purpose.option.privacy-check",
            "label": "老周把我的近况说到哪了？",
            "intent": "strategy",
            "stateTags": [
              "mutual-friend-check",
              "privacy-scope-requested"
            ],
            "sourceRefs": [
              "RF-S03",
              "RF-S04",
              "RF-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "老周把我的近况说到哪了？",
            "consequence": {
              "id": "revived-friend.q.mutual-purpose.option.privacy-check.consequence",
              "action": "对方解释只问了城市；老周也转来同一链接",
              "npcReaction": "对方解释只问了城市；老周也转来同一链接",
              "visibleStateChange": "对方解释只问了城市；老周也转来同一链接 对方解释只问了城市；老周也转来同一链接",
              "nextNodeId": "revived-friend.q.invite-via-mutual"
            }
          },
          {
            "id": "revived-friend.q.mutual-purpose.option.location-first",
            "label": "先说日期地点，我看行程。",
            "intent": "boundary",
            "stateTags": [
              "limited-open",
              "attendance-not-promised"
            ],
            "sourceRefs": [
              "RF-S03",
              "RF-S04",
              "RF-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "先说日期地点，我看行程。",
            "consequence": {
              "id": "revived-friend.q.mutual-purpose.option.location-first.consequence",
              "action": "对方只给文字信息：`7 月 26 日，中午，城南。",
              "npcReaction": "`",
              "visibleStateChange": "对方只给文字信息：`7 月 26 日，中午，城南。 `",
              "nextNodeId": "revived-friend.q.invite-soft"
            }
          },
          {
            "id": "revived-friend.q.mutual-purpose.option.four-cards",
            "label": "玩家确认奶蛙在本机翻四张牌：`请帖 / 借钱 / 约饭 / 还钱`，等本人继续说",
            "intent": "absurd",
            "stateTags": [
              "ritual-object-logic",
              "purpose-not-assumed"
            ],
            "sourceRefs": [
              "RF-S03",
              "RF-S04",
              "RF-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "玩家确认奶蛙在本机翻四张牌：`请帖 / 借钱 / 约饭 / 还钱`，等本人继续说",
            "consequence": {
              "id": "revived-friend.q.mutual-purpose.option.four-cards.consequence",
              "action": "没有把人先判成骗子；对方发来日期与酒店，不要求立刻点链接",
              "npcReaction": "没有把人先判成骗子；对方发来日期与酒店，不要求立刻点链接",
              "visibleStateChange": "没有把人先判成骗子；对方发来日期与酒店，不要求立刻点链接 没有把人先判成骗子；对方发来日期与酒店，不要求立刻点链接",
              "nextNodeId": "revived-friend.q.invite-no-link"
            }
          }
        ],
        "sceneObjects": [
          "旧朋友圈",
          "共同好友",
          "请帖链接",
          "喜糖",
          "旧转账",
          "关系痕迹"
        ],
        "contentVersion": "revived-friend.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "revived-friend.q.mutual-crosscheck": {
        "id": "revived-friend.q.mutual-crosscheck",
        "routeId": "revived-friend",
        "stage": 2,
        "prompt": "老周私聊：他最近在给以前同学发请帖，你别多想。 这句是信息，也是代替别人定义关系。你怎么回？",
        "sourceRefs": [
          "RF-S02",
          "RF-S03"
        ],
        "options": [
          {
            "id": "revived-friend.q.mutual-crosscheck.option.self-say",
            "label": "让他自己跟我说就行。",
            "intent": "strategy",
            "stateTags": [
              "purpose-first",
              "direct-channel-requested"
            ],
            "sourceRefs": [
              "RF-S02",
              "RF-S03"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "让他自己跟我说就行。",
            "consequence": {
              "id": "revived-friend.q.mutual-crosscheck.option.self-say.consequence",
              "action": "老周不再代答；旧同学本人发来请帖",
              "npcReaction": "老周不再代答；旧同学本人发来请帖",
              "visibleStateChange": "老周不再代答；旧同学本人发来请帖 老周不再代答；旧同学本人发来请帖",
              "nextNodeId": "revived-friend.q.invite-direct"
            }
          },
          {
            "id": "revived-friend.q.mutual-crosscheck.option.no-lobbying",
            "label": "你只告诉我是不是婚礼，别替他劝。",
            "intent": "boundary",
            "stateTags": [
              "closed-boundary",
              "mutual-lobbying-blocked"
            ],
            "sourceRefs": [
              "RF-S02",
              "RF-S03"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "你只告诉我是不是婚礼，别替他劝。",
            "consequence": {
              "id": "revived-friend.q.mutual-crosscheck.option.no-lobbying.consequence",
              "action": "老周只确认是婚礼，并把原链接转来，不再加意见",
              "npcReaction": "老周只确认是婚礼，并把原链接转来，不再加意见",
              "visibleStateChange": "老周只确认是婚礼，并把原链接转来，不再加意见 老周只确认是婚礼，并把原链接转来，不再加意见",
              "nextNodeId": "revived-friend.q.invite-via-mutual"
            }
          },
          {
            "id": "revived-friend.q.mutual-crosscheck.option.no-answer-yet",
            "label": "我那天可能出差，先不给答复。",
            "intent": "normal",
            "stateTags": [
              "limited-open",
              "attendance-not-promised"
            ],
            "sourceRefs": [
              "RF-S02",
              "RF-S03"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "我那天可能出差，先不给答复。",
            "consequence": {
              "id": "revived-friend.q.mutual-crosscheck.option.no-answer-yet.consequence",
              "action": "老周回`你自己跟他说`；旧同学只发日期",
              "npcReaction": "老周回`你自己跟他说`；旧同学只发日期",
              "visibleStateChange": "老周回`你自己跟他说`；旧同学只发日期 老周回`你自己跟他说`；旧同学只发日期",
              "nextNodeId": "revived-friend.q.invite-soft"
            }
          },
          {
            "id": "revived-friend.q.mutual-crosscheck.option.not-customer-service",
            "label": "玩家确认奶蛙给老周的头像旁贴`共同好友，不是关系客服`，标签只在本机显示",
            "intent": "absurd",
            "stateTags": [
              "ritual-object-logic",
              "no-private-forwarding"
            ],
            "sourceRefs": [
              "RF-S02",
              "RF-S03"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "玩家确认奶蛙给老周的头像旁贴`共同好友，不是关系客服`，标签只在本机显示",
            "consequence": {
              "id": "revived-friend.q.mutual-crosscheck.option.not-customer-service.consequence",
              "action": "代问链被截断；旧同学改成文字说明，不先发链接",
              "npcReaction": "代问链被截断；旧同学改成文字说明，不先发链接",
              "visibleStateChange": "代问链被截断；旧同学改成文字说明，不先发链接 代问链被截断；旧同学改成文字说明，不先发链接",
              "nextNodeId": "revived-friend.q.invite-no-link"
            }
          }
        ],
        "sceneObjects": [
          "旧朋友圈",
          "共同好友",
          "请帖链接",
          "喜糖",
          "旧转账",
          "关系痕迹"
        ],
        "contentVersion": "revived-friend.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "revived-friend.q.mutual-archaeology": {
        "id": "revived-friend.q.mutual-archaeology",
        "routeId": "revived-friend",
        "stage": 2,
        "prompt": "对方发来一张你们三人的军训合照：老周说这张也发你。顺便问下，你 7 月底在不在？ 你怎么接这个“顺便”？",
        "sourceRefs": [
          "RF-S01",
          "RF-S02",
          "RF-S07"
        ],
        "options": [
          {
            "id": "revived-friend.q.mutual-archaeology.option.say-purpose",
            "label": "照片收到了。7 月底什么事？你直接说。",
            "intent": "normal",
            "stateTags": [
              "purpose-first",
              "purpose-requested"
            ],
            "sourceRefs": [
              "RF-S01",
              "RF-S02",
              "RF-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "照片收到了。7 月底什么事？你直接说。",
            "consequence": {
              "id": "revived-friend.q.mutual-archaeology.option.say-purpose.consequence",
              "action": "对方不再绕旧照片，直接发请帖",
              "npcReaction": "对方不再绕旧照片，直接发请帖",
              "visibleStateChange": "对方不再绕旧照片，直接发请帖 对方不再绕旧照片，直接发请帖",
              "nextNodeId": "revived-friend.q.invite-direct"
            }
          },
          {
            "id": "revived-friend.q.mutual-archaeology.option.photo-scope",
            "label": "老周把这张发给多少人了？",
            "intent": "strategy",
            "stateTags": [
              "mutual-friend-check",
              "photo-sharing-scope-requested"
            ],
            "sourceRefs": [
              "RF-S01",
              "RF-S02",
              "RF-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "老周把这张发给多少人了？",
            "consequence": {
              "id": "revived-friend.q.mutual-archaeology.option.photo-scope.consequence",
              "action": "对方说只发同寝四人；老周转来活动链接",
              "npcReaction": "对方说只发同寝四人；老周转来活动链接",
              "visibleStateChange": "对方说只发同寝四人；老周转来活动链接 对方说只发同寝四人；老周转来活动链接",
              "nextNodeId": "revived-friend.q.invite-via-mutual"
            }
          },
          {
            "id": "revived-friend.q.mutual-archaeology.option.receive-only",
            "label": "照片挺好。月底不一定在，你先说日期。",
            "intent": "boundary",
            "stateTags": [
              "limited-open",
              "attendance-not-promised"
            ],
            "sourceRefs": [
              "RF-S01",
              "RF-S02",
              "RF-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "照片挺好。月底不一定在，你先说日期。",
            "consequence": {
              "id": "revived-friend.q.mutual-archaeology.option.receive-only.consequence",
              "action": "对方给日期，明确`来不了也没关系`",
              "npcReaction": "对方给日期，明确`来不了也没关系`",
              "visibleStateChange": "对方给日期，明确`来不了也没关系` 对方给日期，明确`来不了也没关系`",
              "nextNodeId": "revived-friend.q.invite-soft"
            }
          },
          {
            "id": "revived-friend.q.mutual-archaeology.option.museum-label",
            "label": "玩家确认奶蛙给合照加本地标签`历史资料，不是关系复活证明`，不外发",
            "intent": "absurd",
            "stateTags": [
              "ritual-object-logic",
              "record-context"
            ],
            "sourceRefs": [
              "RF-S01",
              "RF-S02",
              "RF-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "玩家确认奶蛙给合照加本地标签`历史资料，不是关系复活证明`，不外发",
            "consequence": {
              "id": "revived-friend.q.mutual-archaeology.option.museum-label.consequence",
              "action": "旧照片留在本机，对方用文字发来酒店和时间",
              "npcReaction": "旧照片留在本机，对方用文字发来酒店和时间",
              "visibleStateChange": "旧照片留在本机，对方用文字发来酒店和时间 旧照片留在本机，对方用文字发来酒店和时间",
              "nextNodeId": "revived-friend.q.invite-no-link"
            }
          }
        ],
        "sceneObjects": [
          "旧朋友圈",
          "共同好友",
          "请帖链接",
          "喜糖",
          "旧转账",
          "关系痕迹"
        ],
        "contentVersion": "revived-friend.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "revived-friend.q.invite-direct": {
        "id": "revived-friend.q.invite-direct",
        "routeId": "revived-friend",
        "stage": 3,
        "prompt": "对方本人发来一条 H5：电子请帖，点开有地址。你方便的话来。 链接预览只显示平台名。你怎么处理？",
        "sourceRefs": [
          "RF-S04"
        ],
        "options": [
          {
            "id": "revived-friend.q.invite-direct.option.inspect-open",
            "label": "玩家确认先看域名与授权提示，再打开，不提交 RSVP",
            "intent": "strategy",
            "stateTags": [
              "record-context",
              "link-open-confirmed",
              "attendance-not-promised"
            ],
            "sourceRefs": [
              "RF-S04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "玩家确认先看域名与授权提示，再打开，不提交 RSVP",
            "consequence": {
              "id": "revived-friend.q.invite-direct.option.inspect-open.consequence",
              "action": "奶蛙只显示域名、授权和日期。",
              "npcReaction": "对方提议婚礼前找天喝杯咖啡",
              "visibleStateChange": "奶蛙只显示域名、授权和日期。 对方提议婚礼前找天喝杯咖啡",
              "nextNodeId": "revived-friend.q.encounter-planned"
            }
          },
          {
            "id": "revived-friend.q.invite-direct.option.ask-text",
            "label": "链接我先不点，日期地点直接发我吧。",
            "intent": "boundary",
            "stateTags": [
              "closed-boundary",
              "link-not-opened"
            ],
            "sourceRefs": [
              "RF-S04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "链接我先不点，日期地点直接发我吧。",
            "consequence": {
              "id": "revived-friend.q.invite-direct.option.ask-text.consequence",
              "action": "对方发来文字地址；几天后你在地铁站意外碰见他",
              "npcReaction": "对方发来文字地址；几天后你在地铁站意外碰见他",
              "visibleStateChange": "对方发来文字地址；几天后你在地铁站意外碰见他 对方发来文字地址；几天后你在地铁站意外碰见他",
              "nextNodeId": "revived-friend.q.encounter-casual"
            }
          },
          {
            "id": "revived-friend.q.invite-direct.option.received-not-rsvp",
            "label": "收到了。我看完行程再答，先不算到场。",
            "intent": "normal",
            "stateTags": [
              "limited-open",
              "attendance-not-promised"
            ],
            "sourceRefs": [
              "RF-S04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "收到了。我看完行程再答，先不算到场。",
            "consequence": {
              "id": "revived-friend.q.invite-direct.option.received-not-rsvp.consequence",
              "action": "对方回`行，不急`；后来托老周留了一盒喜糖",
              "npcReaction": "对方回`行，不急`；后来托老周留了一盒喜糖",
              "visibleStateChange": "对方回`行，不急`；后来托老周留了一盒喜糖 对方回`行，不急`；后来托老周留了一盒喜糖",
              "nextNodeId": "revived-friend.q.encounter-candy"
            }
          },
          {
            "id": "revived-friend.q.invite-direct.option.link-sandbox",
            "label": "玩家确认奶蛙把链接放进`人情沙盒`：只显示域名、授权、日期，不替你点“参加”",
            "intent": "absurd",
            "stateTags": [
              "ritual-object-logic",
              "link-open-confirmed",
              "attendance-not-promised"
            ],
            "sourceRefs": [
              "RF-S04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "玩家确认奶蛙把链接放进`人情沙盒`：只显示域名、授权、日期，不替你点“参加”",
            "consequence": {
              "id": "revived-friend.q.invite-direct.option.link-sandbox.consequence",
              "action": "浏览和出席被拆开；共同好友生日局上你与对方意外同桌",
              "npcReaction": "浏览和出席被拆开；共同好友生日局上你与对方意外同桌",
              "visibleStateChange": "浏览和出席被拆开；共同好友生日局上你与对方意外同桌 浏览和出席被拆开；共同好友生日局上你与对方意外同桌",
              "nextNodeId": "revived-friend.q.encounter-shared-event"
            }
          }
        ],
        "sceneObjects": [
          "旧朋友圈",
          "共同好友",
          "请帖链接",
          "喜糖",
          "旧转账",
          "关系痕迹"
        ],
        "contentVersion": "revived-friend.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "revived-friend.q.invite-via-mutual": {
        "id": "revived-friend.q.invite-via-mutual",
        "routeId": "revived-friend",
        "stage": 3,
        "prompt": "老周转来一条请帖链接：他让我也发你一份。 原邀请人没有在这条消息里。你怎么处理“二手请帖”？",
        "sourceRefs": [
          "RF-S02",
          "RF-S04"
        ],
        "options": [
          {
            "id": "revived-friend.q.invite-via-mutual.option.ask-original",
            "label": "让他自己发我吧，我再回他。",
            "intent": "strategy",
            "stateTags": [
              "purpose-first",
              "direct-channel-requested"
            ],
            "sourceRefs": [
              "RF-S02",
              "RF-S04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "让他自己发我吧，我再回他。",
            "consequence": {
              "id": "revived-friend.q.invite-via-mutual.option.ask-original.consequence",
              "action": "旧同学本人补发链接，并约咖啡把话说清",
              "npcReaction": "旧同学本人补发链接，并约咖啡把话说清",
              "visibleStateChange": "旧同学本人补发链接，并约咖啡把话说清 旧同学本人补发链接，并约咖啡把话说清",
              "nextNodeId": "revived-friend.q.encounter-planned"
            }
          },
          {
            "id": "revived-friend.q.invite-via-mutual.option.preview-date",
            "label": "玩家确认只看转发预览里的日期，不打开页面",
            "intent": "boundary",
            "stateTags": [
              "limited-open",
              "link-not-opened",
              "attendance-not-promised"
            ],
            "sourceRefs": [
              "RF-S02",
              "RF-S04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "玩家确认只看转发预览里的日期，不打开页面",
            "consequence": {
              "id": "revived-friend.q.invite-via-mutual.option.preview-date.consequence",
              "action": "老周知道你看见日期，但没有替你答应；之后地铁口偶遇旧同学",
              "npcReaction": "老周知道你看见日期，但没有替你答应；之后地铁口偶遇旧同学",
              "visibleStateChange": "老周知道你看见日期，但没有替你答应；之后地铁口偶遇旧同学 老周知道你看见日期，但没有替你答应；之后地铁口偶遇旧同学",
              "nextNodeId": "revived-friend.q.encounter-casual"
            }
          },
          {
            "id": "revived-friend.q.invite-via-mutual.option.stop-persuasion",
            "label": "链接收到。你别替我们互相劝，我自己回他。",
            "intent": "normal",
            "stateTags": [
              "closed-boundary",
              "mutual-lobbying-blocked"
            ],
            "sourceRefs": [
              "RF-S02",
              "RF-S04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "链接收到。你别替我们互相劝，我自己回他。",
            "consequence": {
              "id": "revived-friend.q.invite-via-mutual.option.stop-persuasion.consequence",
              "action": "老周不再催，改为只把一盒喜糖放到前台",
              "npcReaction": "老周不再催，改为只把一盒喜糖放到前台",
              "visibleStateChange": "老周不再催，改为只把一盒喜糖放到前台 老周不再催，改为只把一盒喜糖放到前台",
              "nextNodeId": "revived-friend.q.encounter-candy"
            }
          },
          {
            "id": "revived-friend.q.invite-via-mutual.option.secondhand-pouch",
            "label": "玩家确认奶蛙把链接装进`二手请帖`袋，不打开、不回出席",
            "intent": "absurd",
            "stateTags": [
              "ritual-object-logic",
              "link-not-opened"
            ],
            "sourceRefs": [
              "RF-S02",
              "RF-S04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "玩家确认奶蛙把链接装进`二手请帖`袋，不打开、不回出席",
            "consequence": {
              "id": "revived-friend.q.invite-via-mutual.option.secondhand-pouch.consequence",
              "action": "链接没有变成默认承诺；共同好友生日局仍让两人见面",
              "npcReaction": "链接没有变成默认承诺；共同好友生日局仍让两人见面",
              "visibleStateChange": "链接没有变成默认承诺；共同好友生日局仍让两人见面 链接没有变成默认承诺；共同好友生日局仍让两人见面",
              "nextNodeId": "revived-friend.q.encounter-shared-event"
            }
          }
        ],
        "sceneObjects": [
          "旧朋友圈",
          "共同好友",
          "请帖链接",
          "喜糖",
          "旧转账",
          "关系痕迹"
        ],
        "contentVersion": "revived-friend.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "revived-friend.q.invite-soft": {
        "id": "revived-friend.q.invite-soft",
        "routeId": "revived-friend",
        "stage": 3,
        "prompt": "对方说：7 月 26 日中午，城南。婚礼不大，你来不了也没事。链接要的话我发。 这句给了退路，也在等回应。你怎么回？",
        "sourceRefs": [
          "RF-S03",
          "RF-S04",
          "RF-S07"
        ],
        "options": [
          {
            "id": "revived-friend.q.invite-soft.option.coffee-first",
            "label": "先恭喜。婚礼前有空喝杯咖啡，见完我再答你。",
            "intent": "normal",
            "stateTags": [
              "warm-reopen",
              "attendance-not-promised"
            ],
            "sourceRefs": [
              "RF-S03",
              "RF-S04",
              "RF-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "先恭喜。婚礼前有空喝杯咖啡，见完我再答你。",
            "consequence": {
              "id": "revived-friend.q.invite-soft.option.coffee-first.consequence",
              "action": "对方接受把“叙旧”和“出席”分开，约在旧城区见面",
              "npcReaction": "对方接受把“叙旧”和“出席”分开，约在旧城区见面",
              "visibleStateChange": "对方接受把“叙旧”和“出席”分开，约在旧城区见面 对方接受把“叙旧”和“出席”分开，约在旧城区见面",
              "nextNodeId": "revived-friend.q.encounter-planned"
            }
          },
          {
            "id": "revived-friend.q.invite-soft.option.cannot-attend",
            "label": "那天不在城里，我先不收链接。还是恭喜你。",
            "intent": "boundary",
            "stateTags": [
              "closed-boundary",
              "attendance-declined"
            ],
            "sourceRefs": [
              "RF-S03",
              "RF-S04",
              "RF-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "那天不在城里，我先不收链接。还是恭喜你。",
            "consequence": {
              "id": "revived-friend.q.invite-soft.option.cannot-attend.consequence",
              "action": "对方回`没事`；几天后两人在地铁站意外碰见",
              "npcReaction": "对方回`没事`；几天后两人在地铁站意外碰见",
              "visibleStateChange": "对方回`没事`；几天后两人在地铁站意外碰见 对方回`没事`；几天后两人在地铁站意外碰见",
              "nextNodeId": "revived-friend.q.encounter-casual"
            }
          },
          {
            "id": "revived-friend.q.invite-soft.option.answer-later",
            "label": "你发吧。我看了也不等于到场，晚点答。",
            "intent": "absurd",
            "stateTags": [
              "limited-open",
              "link-open-confirmed",
              "attendance-not-promised"
            ],
            "sourceRefs": [
              "RF-S03",
              "RF-S04",
              "RF-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "你发吧。我看了也不等于到场，晚点答。",
            "consequence": {
              "id": "revived-friend.q.invite-soft.option.answer-later.consequence",
              "action": "对方回`知道`，随后托老周留一盒喜糖",
              "npcReaction": "对方回`知道`，随后托老周留一盒喜糖",
              "visibleStateChange": "对方回`知道`，随后托老周留一盒喜糖 对方回`知道`，随后托老周留一盒喜糖",
              "nextNodeId": "revived-friend.q.encounter-candy"
            }
          },
          {
            "id": "revived-friend.q.invite-soft.option.text-is-enough",
            "label": "文字信息够了，链接不用。",
            "intent": "strategy",
            "stateTags": [
              "record-context",
              "link-not-opened"
            ],
            "sourceRefs": [
              "RF-S03",
              "RF-S04",
              "RF-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "文字信息够了，链接不用。",
            "consequence": {
              "id": "revived-friend.q.invite-soft.option.text-is-enough.consequence",
              "action": "日期和地点进日历，但 RSVP 保持空白；共同好友生日局两人同桌",
              "npcReaction": "日期和地点进日历，但 RSVP 保持空白；共同好友生日局两人同桌",
              "visibleStateChange": "日期和地点进日历，但 RSVP 保持空白；共同好友生日局两人同桌 日期和地点进日历，但 RSVP 保持空白；共同好友生日局两人同桌",
              "nextNodeId": "revived-friend.q.encounter-shared-event"
            }
          }
        ],
        "sceneObjects": [
          "旧朋友圈",
          "共同好友",
          "请帖链接",
          "喜糖",
          "旧转账",
          "关系痕迹"
        ],
        "contentVersion": "revived-friend.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "revived-friend.q.invite-no-link": {
        "id": "revived-friend.q.invite-no-link",
        "routeId": "revived-friend",
        "stage": 3,
        "prompt": "对方只发文字：7 月 26 日，中午，城南云桥酒店。想看请帖我再发。 没有链接，也没有催。你怎么处理？",
        "sourceRefs": [
          "RF-S04",
          "RF-S07"
        ],
        "options": [
          {
            "id": "revived-friend.q.invite-no-link.option.request-link",
            "label": "发我吧，我先看信息，不先答到不到。",
            "intent": "boundary",
            "stateTags": [
              "limited-open",
              "link-open-confirmed",
              "attendance-not-promised"
            ],
            "sourceRefs": [
              "RF-S04",
              "RF-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "发我吧，我先看信息，不先答到不到。",
            "consequence": {
              "id": "revived-friend.q.invite-no-link.option.request-link.consequence",
              "action": "对方发链接但不追问；两人先约咖啡",
              "npcReaction": "对方发链接但不追问；两人先约咖啡",
              "visibleStateChange": "对方发链接但不追问；两人先约咖啡 对方发链接但不追问；两人先约咖啡",
              "nextNodeId": "revived-friend.q.encounter-planned"
            }
          },
          {
            "id": "revived-friend.q.invite-no-link.option.keep-text",
            "label": "文字够了，我先记日期。",
            "intent": "strategy",
            "stateTags": [
              "record-context",
              "link-not-opened",
              "attendance-not-promised"
            ],
            "sourceRefs": [
              "RF-S04",
              "RF-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "文字够了，我先记日期。",
            "consequence": {
              "id": "revived-friend.q.invite-no-link.option.keep-text.consequence",
              "action": "奶蛙只录入日期地点；几天后地铁口偶遇",
              "npcReaction": "奶蛙只录入日期地点；几天后地铁口偶遇",
              "visibleStateChange": "奶蛙只录入日期地点；几天后地铁口偶遇 奶蛙只录入日期地点；几天后地铁口偶遇",
              "nextNodeId": "revived-friend.q.encounter-casual"
            }
          },
          {
            "id": "revived-friend.q.invite-no-link.option.congrats-only",
            "label": "收到，恭喜。能不能去我晚点说。",
            "intent": "normal",
            "stateTags": [
              "respectful-response",
              "attendance-not-promised"
            ],
            "sourceRefs": [
              "RF-S04",
              "RF-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "收到，恭喜。能不能去我晚点说。",
            "consequence": {
              "id": "revived-friend.q.invite-no-link.option.congrats-only.consequence",
              "action": "对方回一个`好`，后来托老周留喜糖",
              "npcReaction": "对方回一个`好`，后来托老周留喜糖",
              "visibleStateChange": "对方回一个`好`，后来托老周留喜糖 对方回一个`好`，后来托老周留喜糖",
              "nextNodeId": "revived-friend.q.encounter-candy"
            }
          },
          {
            "id": "revived-friend.q.invite-no-link.option.blank-rsvp",
            "label": "玩家确认奶蛙把`日期`和`地点`贴进日历，把`是否到场`那格留白",
            "intent": "absurd",
            "stateTags": [
              "ritual-object-logic",
              "attendance-not-promised"
            ],
            "sourceRefs": [
              "RF-S04",
              "RF-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "玩家确认奶蛙把`日期`和`地点`贴进日历，把`是否到场`那格留白",
            "consequence": {
              "id": "revived-friend.q.invite-no-link.option.blank-rsvp.consequence",
              "action": "留白没有被自动勾选；共同好友生日局两人意外同桌",
              "npcReaction": "留白没有被自动勾选；共同好友生日局两人意外同桌",
              "visibleStateChange": "留白没有被自动勾选；共同好友生日局两人意外同桌 留白没有被自动勾选；共同好友生日局两人意外同桌",
              "nextNodeId": "revived-friend.q.encounter-shared-event"
            }
          }
        ],
        "sceneObjects": [
          "旧朋友圈",
          "共同好友",
          "请帖链接",
          "喜糖",
          "旧转账",
          "关系痕迹"
        ],
        "contentVersion": "revived-friend.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "revived-friend.q.encounter-planned": {
        "id": "revived-friend.q.encounter-planned",
        "routeId": "revived-friend",
        "stage": 4,
        "prompt": "你们在旧城区咖啡店见面。对方递来一小盒喜糖：不用现在答婚礼，先拿着。 你怎么接这个物件？",
        "sourceRefs": [
          "RF-S06",
          "RF-S07"
        ],
        "options": [
          {
            "id": "revived-friend.q.encounter-planned.option.accept-later",
            "label": "糖我收，行程看完再答你。",
            "intent": "normal",
            "stateTags": [
              "limited-open",
              "candy-accepted",
              "attendance-not-promised"
            ],
            "sourceRefs": [
              "RF-S06",
              "RF-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "糖我收，行程看完再答你。",
            "consequence": {
              "id": "revived-friend.q.encounter-planned.option.accept-later.consequence",
              "action": "糖进包，承诺仍留在桌上。",
              "npcReaction": "对方忽然提起当年 52.80 元的两碗面",
              "visibleStateChange": "糖进包，承诺仍留在桌上。 对方忽然提起当年 52.80 元的两碗面",
              "nextNodeId": "revived-friend.q.transfer-aa"
            }
          },
          {
            "id": "revived-friend.q.encounter-planned.option.separate-ritual",
            "label": "喜糖是喜糖，能不能到场另算。",
            "intent": "boundary",
            "stateTags": [
              "closed-boundary",
              "ritual-separated"
            ],
            "sourceRefs": [
              "RF-S06",
              "RF-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "喜糖是喜糖，能不能到场另算。",
            "consequence": {
              "id": "revived-friend.q.encounter-planned.option.separate-ritual.consequence",
              "action": "对方点头，转而问起 2019 年备注`路费`的 200 元",
              "npcReaction": "对方点头，转而问起 2019 年备注`路费`的 200 元",
              "visibleStateChange": "对方点头，转而问起 2019 年备注`路费`的 200 元 对方点头，转而问起 2019 年备注`路费`的 200 元",
              "nextNodeId": "revived-friend.q.transfer-gift"
            }
          },
          {
            "id": "revived-friend.q.encounter-planned.option.ten-minutes",
            "label": "我今天只能坐十分钟，先聊近况。",
            "intent": "strategy",
            "stateTags": [
              "limited-open",
              "meeting-time-bounded"
            ],
            "sourceRefs": [
              "RF-S06",
              "RF-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "我今天只能坐十分钟，先聊近况。",
            "consequence": {
              "id": "revived-friend.q.encounter-planned.option.ten-minutes.consequence",
              "action": "对方不再扩展婚礼话题，却想起一张旧演出票是否已退款",
              "npcReaction": "对方不再扩展婚礼话题，却想起一张旧演出票是否已退款",
              "visibleStateChange": "对方不再扩展婚礼话题，却想起一张旧演出票是否已退款 对方不再扩展婚礼话题，却想起一张旧演出票是否已退款",
              "nextNodeId": "revived-friend.q.transfer-refund"
            }
          },
          {
            "id": "revived-friend.q.encounter-planned.option.two-trays",
            "label": "玩家确认奶蛙把喜糖和请帖放两个托盘：`祝福`、`出席`",
            "intent": "absurd",
            "stateTags": [
              "ritual-object-logic",
              "ritual-separated"
            ],
            "sourceRefs": [
              "RF-S06",
              "RF-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "玩家确认奶蛙把喜糖和请帖放两个托盘：`祝福`、`出席`",
            "consequence": {
              "id": "revived-friend.q.encounter-planned.option.two-trays.consequence",
              "action": "对方笑了，没有强行合盘，只说`我还翻到一笔旧转账`",
              "npcReaction": "对方笑了，没有强行合盘，只说`我还翻到一笔旧转账`",
              "visibleStateChange": "对方笑了，没有强行合盘，只说`我还翻到一笔旧转账` 对方笑了，没有强行合盘，只说`我还翻到一笔旧转账`",
              "nextNodeId": "revived-friend.q.transfer-dont-open"
            }
          }
        ],
        "sceneObjects": [
          "旧朋友圈",
          "共同好友",
          "请帖链接",
          "喜糖",
          "旧转账",
          "关系痕迹"
        ],
        "contentVersion": "revived-friend.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "revived-friend.q.encounter-casual": {
        "id": "revived-friend.q.encounter-casual",
        "routeId": "revived-friend",
        "stage": 4,
        "prompt": "周末地铁口偶遇，对方手里拎着剩下的喜糖，先愣了一秒：这么巧。要不要拿一盒？ 你怎么停下来？",
        "sourceRefs": [
          "RF-S06",
          "RF-S07"
        ],
        "options": [
          {
            "id": "revived-friend.q.encounter-casual.option.five-minutes",
            "label": "行，我还有五分钟，边走边说。",
            "intent": "normal",
            "stateTags": [
              "warm-reopen",
              "meeting-time-bounded"
            ],
            "sourceRefs": [
              "RF-S06",
              "RF-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "行，我还有五分钟，边走边说。",
            "consequence": {
              "id": "revived-friend.q.encounter-casual.option.five-minutes.consequence",
              "action": "两人走过一站路，对方想起当年两碗面的 52.80",
              "npcReaction": "两人走过一站路，对方想起当年两碗面的 52.80",
              "visibleStateChange": "两人走过一站路，对方想起当年两碗面的 52.80 两人走过一站路，对方想起当年两碗面的 52.80",
              "nextNodeId": "revived-friend.q.transfer-aa"
            }
          },
          {
            "id": "revived-friend.q.encounter-casual.option.one-candy",
            "label": "拿一颗就行，整盒你留给要到场的人。",
            "intent": "boundary",
            "stateTags": [
              "closed-boundary",
              "ritual-separated"
            ],
            "sourceRefs": [
              "RF-S06",
              "RF-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "拿一颗就行，整盒你留给要到场的人。",
            "consequence": {
              "id": "revived-friend.q.encounter-casual.option.one-candy.consequence",
              "action": "一颗糖没有变成 RSVP，对方提起旧的 200 元路费",
              "npcReaction": "一颗糖没有变成 RSVP，对方提起旧的 200 元路费",
              "visibleStateChange": "一颗糖没有变成 RSVP，对方提起旧的 200 元路费 一颗糖没有变成 RSVP，对方提起旧的 200 元路费",
              "nextNodeId": "revived-friend.q.transfer-gift"
            }
          },
          {
            "id": "revived-friend.q.encounter-casual.option.message-later",
            "label": "今天赶时间，晚点消息里说。",
            "intent": "strategy",
            "stateTags": [
              "limited-open",
              "meeting-deferred"
            ],
            "sourceRefs": [
              "RF-S06",
              "RF-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "今天赶时间，晚点消息里说。",
            "consequence": {
              "id": "revived-friend.q.encounter-casual.option.message-later.consequence",
              "action": "对方没有拦路，只补一句`我还欠你演出票钱吗？`",
              "npcReaction": "对方没有拦路，只补一句`我还欠你演出票钱吗？`",
              "visibleStateChange": "对方没有拦路，只补一句`我还欠你演出票钱吗？` 对方没有拦路，只补一句`我还欠你演出票钱吗？`",
              "nextNodeId": "revived-friend.q.transfer-refund"
            }
          },
          {
            "id": "revived-friend.q.encounter-casual.option.catch-candy",
            "label": "玩家确认奶蛙接住从袋里滚出的糖，只放回对方手里，不替你拿整盒",
            "intent": "absurd",
            "stateTags": [
              "ritual-object-logic",
              "no-unconfirmed-gift"
            ],
            "sourceRefs": [
              "RF-S06",
              "RF-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "玩家确认奶蛙接住从袋里滚出的糖，只放回对方手里，不替你拿整盒",
            "consequence": {
              "id": "revived-friend.q.encounter-casual.option.catch-candy.consequence",
              "action": "偶遇没有被物件强行升级；对方说起一笔自己也记不清的旧转账",
              "npcReaction": "偶遇没有被物件强行升级；对方说起一笔自己也记不清的旧转账",
              "visibleStateChange": "偶遇没有被物件强行升级；对方说起一笔自己也记不清的旧转账 偶遇没有被物件强行升级；对方说起一笔自己也记不清的旧转账",
              "nextNodeId": "revived-friend.q.transfer-dont-open"
            }
          }
        ],
        "sceneObjects": [
          "旧朋友圈",
          "共同好友",
          "请帖链接",
          "喜糖",
          "旧转账",
          "关系痕迹"
        ],
        "contentVersion": "revived-friend.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "revived-friend.q.encounter-candy": {
        "id": "revived-friend.q.encounter-candy",
        "routeId": "revived-friend",
        "stage": 4,
        "prompt": "前台通知你有个小盒子。老周代放的，贴纸写：喜糖，收不收都别有压力。 旧同学随后问：糖到了吗？ 你怎么回？",
        "sourceRefs": [
          "RF-S06",
          "RF-S07"
        ],
        "options": [
          {
            "id": "revived-friend.q.encounter-candy.option.confirm-only",
            "label": "到了，谢谢。到不到我还是晚点答。",
            "intent": "normal",
            "stateTags": [
              "limited-open",
              "candy-accepted",
              "attendance-not-promised"
            ],
            "sourceRefs": [
              "RF-S06",
              "RF-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "到了，谢谢。到不到我还是晚点答。",
            "consequence": {
              "id": "revived-friend.q.encounter-candy.option.confirm-only.consequence",
              "action": "对方回`好`，接着问起当年 52.80 的 AA",
              "npcReaction": "对方回`好`，接着问起当年 52.80 的 AA",
              "visibleStateChange": "对方回`好`，接着问起当年 52.80 的 AA 对方回`好`，接着问起当年 52.80 的 AA",
              "nextNodeId": "revived-friend.q.transfer-aa"
            }
          },
          {
            "id": "revived-friend.q.encounter-candy.option.return-unopened",
            "label": "玩家确认把未拆盒子请老周原样带回，并回复`心意收到，糖先不留`",
            "intent": "boundary",
            "stateTags": [
              "closed-boundary",
              "gift-return-confirmed"
            ],
            "sourceRefs": [
              "RF-S06",
              "RF-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "玩家确认把未拆盒子请老周原样带回，并回复`心意收到，糖先不留`",
            "consequence": {
              "id": "revived-friend.q.encounter-candy.option.return-unopened.consequence",
              "action": "对方没有生气，只问一笔 200 元路费是否还清",
              "npcReaction": "对方没有生气，只问一笔 200 元路费是否还清",
              "visibleStateChange": "对方没有生气，只问一笔 200 元路费是否还清 对方没有生气，只问一笔 200 元路费是否还清",
              "nextNodeId": "revived-friend.q.transfer-gift"
            }
          },
          {
            "id": "revived-friend.q.encounter-candy.option.ask-why-mutual",
            "label": "怎么又让老周转？你直接跟我说就行。",
            "intent": "strategy",
            "stateTags": [
              "purpose-first",
              "direct-channel-requested"
            ],
            "sourceRefs": [
              "RF-S06",
              "RF-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "怎么又让老周转？你直接跟我说就行。",
            "consequence": {
              "id": "revived-friend.q.encounter-candy.option.ask-why-mutual.consequence",
              "action": "对方道歉，说怕突然；又想起演出票退款",
              "npcReaction": "对方道歉，说怕突然；又想起演出票退款",
              "visibleStateChange": "对方道歉，说怕突然；又想起演出票退款 对方道歉，说怕突然；又想起演出票退款",
              "nextNodeId": "revived-friend.q.transfer-refund"
            }
          },
          {
            "id": "revived-friend.q.encounter-candy.option.pending-label",
            "label": "玩家确认奶蛙给盒子贴本地标签`糖已到，关系待定`，再把这六个字发给本人",
            "intent": "absurd",
            "stateTags": [
              "ritual-object-logic",
              "player-confirmed-message"
            ],
            "sourceRefs": [
              "RF-S06",
              "RF-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "玩家确认奶蛙给盒子贴本地标签`糖已到，关系待定`，再把这六个字发给本人",
            "consequence": {
              "id": "revived-friend.q.encounter-candy.option.pending-label.consequence",
              "action": "对方回了一个`懂`，随后提起不确定名目的旧转账",
              "npcReaction": "对方回了一个`懂`，随后提起不确定名目的旧转账",
              "visibleStateChange": "对方回了一个`懂`，随后提起不确定名目的旧转账 对方回了一个`懂`，随后提起不确定名目的旧转账",
              "nextNodeId": "revived-friend.q.transfer-dont-open"
            }
          }
        ],
        "sceneObjects": [
          "旧朋友圈",
          "共同好友",
          "请帖链接",
          "喜糖",
          "旧转账",
          "关系痕迹"
        ],
        "contentVersion": "revived-friend.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "revived-friend.q.encounter-shared-event": {
        "id": "revived-friend.q.encounter-shared-event",
        "routeId": "revived-friend",
        "stage": 4,
        "prompt": "老周生日局上，你和旧同学意外同桌。桌中央是一碗婚礼剩下的喜糖。对方问：你坐这边没事吧？ 你怎么安放这段关系？",
        "sourceRefs": [
          "RF-S02",
          "RF-S06",
          "RF-S07"
        ],
        "options": [
          {
            "id": "revived-friend.q.encounter-shared-event.option.normal-chat",
            "label": "没事，正常吃饭。最近怎么样？",
            "intent": "normal",
            "stateTags": [
              "warm-reopen",
              "shared-space-opened"
            ],
            "sourceRefs": [
              "RF-S02",
              "RF-S06",
              "RF-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "没事，正常吃饭。最近怎么样？",
            "consequence": {
              "id": "revived-friend.q.encounter-shared-event.option.normal-chat.consequence",
              "action": "对方只聊近况，饭后提到 52.80 的两碗面",
              "npcReaction": "对方只聊近况，饭后提到 52.80 的两碗面",
              "visibleStateChange": "对方只聊近况，饭后提到 52.80 的两碗面 对方只聊近况，饭后提到 52.80 的两碗面",
              "nextNodeId": "revived-friend.q.transfer-aa"
            }
          },
          {
            "id": "revived-friend.q.encounter-shared-event.option.hello-only",
            "label": "坐吧。今天先不补旧故事。",
            "intent": "boundary",
            "stateTags": [
              "closed-boundary",
              "shared-space-limited"
            ],
            "sourceRefs": [
              "RF-S02",
              "RF-S06",
              "RF-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "坐吧。今天先不补旧故事。",
            "consequence": {
              "id": "revived-friend.q.encounter-shared-event.option.hello-only.consequence",
              "action": "对方尊重边界，只问一句 200 元路费是否已还",
              "npcReaction": "对方尊重边界，只问一句 200 元路费是否已还",
              "visibleStateChange": "对方尊重边界，只问一句 200 元路费是否已还 对方尊重边界，只问一句 200 元路费是否已还",
              "nextNodeId": "revived-friend.q.transfer-gift"
            }
          },
          {
            "id": "revived-friend.q.encounter-shared-event.option.leave-early",
            "label": "我吃完这轮就走，先跟你说一声。",
            "intent": "strategy",
            "stateTags": [
              "limited-open",
              "exit-stated"
            ],
            "sourceRefs": [
              "RF-S02",
              "RF-S06",
              "RF-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "我吃完这轮就走，先跟你说一声。",
            "consequence": {
              "id": "revived-friend.q.encounter-shared-event.option.leave-early.consequence",
              "action": "离开前，对方匆忙问起旧演出票退款",
              "npcReaction": "离开前，对方匆忙问起旧演出票退款",
              "visibleStateChange": "离开前，对方匆忙问起旧演出票退款 离开前，对方匆忙问起旧演出票退款",
              "nextNodeId": "revived-friend.q.transfer-refund"
            }
          },
          {
            "id": "revived-friend.q.encounter-shared-event.option.rotate-bowl",
            "label": "玩家确认奶蛙把糖碗转到桌中央线，不偏向任何一边",
            "intent": "absurd",
            "stateTags": [
              "ritual-object-logic",
              "ritual-neutralized"
            ],
            "sourceRefs": [
              "RF-S02",
              "RF-S06",
              "RF-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "玩家确认奶蛙把糖碗转到桌中央线，不偏向任何一边",
            "consequence": {
              "id": "revived-friend.q.encounter-shared-event.option.rotate-bowl.consequence",
              "action": "喜糖回到公共物件，对方不再用它试探，只提一笔旧转账",
              "npcReaction": "喜糖回到公共物件，对方不再用它试探，只提一笔旧转账",
              "visibleStateChange": "喜糖回到公共物件，对方不再用它试探，只提一笔旧转账 喜糖回到公共物件，对方不再用它试探，只提一笔旧转账",
              "nextNodeId": "revived-friend.q.transfer-dont-open"
            }
          }
        ],
        "sceneObjects": [
          "旧朋友圈",
          "共同好友",
          "请帖链接",
          "喜糖",
          "旧转账",
          "关系痕迹"
        ],
        "contentVersion": "revived-friend.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "revived-friend.q.transfer-aa": {
        "id": "revived-friend.q.transfer-aa",
        "routeId": "revived-friend",
        "stage": 5,
        "prompt": "对方说：我翻到 2019 年那笔 52.80，不记得是你垫的还是我还的。你要不要一起看？ 是否打开你自己的记录，由你决定。",
        "sourceRefs": [
          "RF-S05",
          "RF-S07"
        ],
        "options": [
          {
            "id": "revived-friend.q.transfer-aa.option.open-context",
            "label": "玩家确认打开自己的记录；备注是`两碗面`。回复：`当年 AA 已经结束，别续账。`",
            "intent": "strategy",
            "stateTags": [
              "record-context",
              "old-account-closed"
            ],
            "sourceRefs": [
              "RF-S05",
              "RF-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "玩家确认打开自己的记录；备注是`两碗面`。回复：`当年 AA 已经结束，别续账。`",
            "consequence": {
              "id": "revived-friend.q.transfer-aa.option.open-context.consequence",
              "action": "金额回到一顿饭，不再承担三年关系。",
              "npcReaction": "对方问`以后还能偶尔联系吗？`",
              "visibleStateChange": "金额回到一顿饭，不再承担三年关系。 对方问`以后还能偶尔联系吗？`",
              "nextNodeId": "revived-friend.q.relation-next"
            }
          },
          {
            "id": "revived-friend.q.transfer-aa.option.no-open",
            "label": "这么小的旧账别翻了，到这就行。",
            "intent": "boundary",
            "stateTags": [
              "closed-boundary",
              "record-not-opened"
            ],
            "sourceRefs": [
              "RF-S05",
              "RF-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "这么小的旧账别翻了，到这就行。",
            "consequence": {
              "id": "revived-friend.q.transfer-aa.option.no-open.consequence",
              "action": "对方回`也是`，不再追问；本局结算",
              "npcReaction": "对方回`也是`，不再追问；本局结算",
              "visibleStateChange": "对方回`也是`，不再追问；本局结算 对方回`也是`，不再追问；本局结算",
              "nextNodeId": "result"
            }
          },
          {
            "id": "revived-friend.q.transfer-aa.option.their-context",
            "label": "你把你那边的备注发我，我不先翻自己的。",
            "intent": "normal",
            "stateTags": [
              "record-context",
              "limited-open"
            ],
            "sourceRefs": [
              "RF-S05",
              "RF-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "你把你那边的备注发我，我不先翻自己的。",
            "consequence": {
              "id": "revived-friend.q.transfer-aa.option.their-context.consequence",
              "action": "对方发来`面钱`，两边都没再转账；本局结算",
              "npcReaction": "对方发来`面钱`，两边都没再转账；本局结算",
              "visibleStateChange": "对方发来`面钱`，两边都没再转账；本局结算 对方发来`面钱`，两边都没再转账；本局结算",
              "nextNodeId": "result"
            }
          },
          {
            "id": "revived-friend.q.transfer-aa.option.candy-scale",
            "label": "玩家确认奶蛙用两颗糖压住`52.80`纸条：`旧账不参与婚礼投票`",
            "intent": "absurd",
            "stateTags": [
              "ritual-object-logic",
              "ritual-separated"
            ],
            "sourceRefs": [
              "RF-S05",
              "RF-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "玩家确认奶蛙用两颗糖压住`52.80`纸条：`旧账不参与婚礼投票`",
            "consequence": {
              "id": "revived-friend.q.transfer-aa.option.candy-scale.consequence",
              "action": "对方笑着收回转账页面，出席仍由你决定；本局结算",
              "npcReaction": "对方笑着收回转账页面，出席仍由你决定；本局结算",
              "visibleStateChange": "对方笑着收回转账页面，出席仍由你决定；本局结算 对方笑着收回转账页面，出席仍由你决定；本局结算",
              "nextNodeId": "result"
            }
          }
        ],
        "sceneObjects": [
          "旧朋友圈",
          "共同好友",
          "请帖链接",
          "喜糖",
          "旧转账",
          "关系痕迹"
        ],
        "contentVersion": "revived-friend.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "revived-friend.q.transfer-gift": {
        "id": "revived-friend.q.transfer-gift",
        "routeId": "revived-friend",
        "stage": 5,
        "prompt": "记录里有 2019 年一笔 200 元，备注只写路费。对方说：要是我没还，我现在转你。 你怎么阻止旧钱抢先定义关系？",
        "sourceRefs": [
          "RF-S05"
        ],
        "options": [
          {
            "id": "revived-friend.q.transfer-gift.option.open-note",
            "label": "玩家确认打开自己的记录，看到后续备注`打车已还`：`这笔结清了，不用再转。`",
            "intent": "strategy",
            "stateTags": [
              "record-context",
              "old-account-closed"
            ],
            "sourceRefs": [
              "RF-S05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "玩家确认打开自己的记录，看到后续备注`打车已还`：`这笔结清了，不用再转。`",
            "consequence": {
              "id": "revived-friend.q.transfer-gift.option.open-note.consequence",
              "action": "转账按钮收起。",
              "npcReaction": "对方问关系以后要不要留一条缝",
              "visibleStateChange": "转账按钮收起。 对方问关系以后要不要留一条缝",
              "nextNodeId": "revived-friend.q.relation-next"
            }
          },
          {
            "id": "revived-friend.q.transfer-gift.option.no-transfer",
            "label": "我不翻，也别直接转。过去的就过去。",
            "intent": "boundary",
            "stateTags": [
              "closed-boundary",
              "record-not-opened",
              "no-transfer"
            ],
            "sourceRefs": [
              "RF-S05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "我不翻，也别直接转。过去的就过去。",
            "consequence": {
              "id": "revived-friend.q.transfer-gift.option.no-transfer.consequence",
              "action": "没有一笔新钱制造新义务；本局结算",
              "npcReaction": "没有一笔新钱制造新义务；本局结算",
              "visibleStateChange": "没有一笔新钱制造新义务；本局结算 没有一笔新钱制造新义务；本局结算",
              "nextNodeId": "result"
            }
          },
          {
            "id": "revived-friend.q.transfer-gift.option.context-first",
            "label": "先说清当时什么事，再决定要不要处理钱。",
            "intent": "normal",
            "stateTags": [
              "purpose-first",
              "record-context"
            ],
            "sourceRefs": [
              "RF-S05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "先说清当时什么事，再决定要不要处理钱。",
            "consequence": {
              "id": "revived-friend.q.transfer-gift.option.context-first.consequence",
              "action": "对方回忆起是回程打车，撤回转账动作；本局结算",
              "npcReaction": "对方回忆起是回程打车，撤回转账动作；本局结算",
              "visibleStateChange": "对方回忆起是回程打车，撤回转账动作；本局结算 对方回忆起是回程打车，撤回转账动作；本局结算",
              "nextNodeId": "result"
            }
          },
          {
            "id": "revived-friend.q.transfer-gift.option.glass-button",
            "label": "玩家确认奶蛙给转账按钮罩玻璃：`先说名目，再碰钱`",
            "intent": "absurd",
            "stateTags": [
              "ritual-object-logic",
              "no-transfer"
            ],
            "sourceRefs": [
              "RF-S05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "玩家确认奶蛙给转账按钮罩玻璃：`先说名目，再碰钱`",
            "consequence": {
              "id": "revived-friend.q.transfer-gift.option.glass-button.consequence",
              "action": "按钮仍能看见但不能误触，对方开始讲上下文；本局结算",
              "npcReaction": "按钮仍能看见但不能误触，对方开始讲上下文；本局结算",
              "visibleStateChange": "按钮仍能看见但不能误触，对方开始讲上下文；本局结算 按钮仍能看见但不能误触，对方开始讲上下文；本局结算",
              "nextNodeId": "result"
            }
          }
        ],
        "sceneObjects": [
          "旧朋友圈",
          "共同好友",
          "请帖链接",
          "喜糖",
          "旧转账",
          "关系痕迹"
        ],
        "contentVersion": "revived-friend.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "revived-friend.q.transfer-refund": {
        "id": "revived-friend.q.transfer-refund",
        "routeId": "revived-friend",
        "stage": 5,
        "prompt": "对方说：那次演出票是不是你替我垫的？我一直记着。 你的记录可能有后续退款，也可能没有。怎么查？",
        "sourceRefs": [
          "RF-S05"
        ],
        "options": [
          {
            "id": "revived-friend.q.transfer-refund.option.open-thread",
            "label": "玩家确认打开自己的交易串；同日下午有一笔等额退款：`当天退过了，别再还。`",
            "intent": "strategy",
            "stateTags": [
              "record-context",
              "old-account-closed"
            ],
            "sourceRefs": [
              "RF-S05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "玩家确认打开自己的交易串；同日下午有一笔等额退款：`当天退过了，别再还。`",
            "consequence": {
              "id": "revived-friend.q.transfer-refund.option.open-thread.consequence",
              "action": "旧票根和退款对上，对方转而问以后是否还能联系",
              "npcReaction": "旧票根和退款对上，对方转而问以后是否还能联系",
              "visibleStateChange": "旧票根和退款对上，对方转而问以后是否还能联系 旧票根和退款对上，对方转而问以后是否还能联系",
              "nextNodeId": "revived-friend.q.relation-next"
            }
          },
          {
            "id": "revived-friend.q.transfer-refund.option.pause-money",
            "label": "我没确认前别转，等我有空再看。",
            "intent": "normal",
            "stateTags": [
              "limited-open",
              "no-transfer"
            ],
            "sourceRefs": [
              "RF-S05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "我没确认前别转，等我有空再看。",
            "consequence": {
              "id": "revived-friend.q.transfer-refund.option.pause-money.consequence",
              "action": "对方停在等待，不用新钱催出答案；本局结算",
              "npcReaction": "对方停在等待，不用新钱催出答案；本局结算",
              "visibleStateChange": "对方停在等待，不用新钱催出答案；本局结算 对方停在等待，不用新钱催出答案；本局结算",
              "nextNodeId": "result"
            }
          },
          {
            "id": "revived-friend.q.transfer-refund.option.not-attendance-credit",
            "label": "就算没退，也别拿它换我出席。两件事分开。",
            "intent": "boundary",
            "stateTags": [
              "closed-boundary",
              "ritual-separated"
            ],
            "sourceRefs": [
              "RF-S05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "就算没退，也别拿它换我出席。两件事分开。",
            "consequence": {
              "id": "revived-friend.q.transfer-refund.option.not-attendance-credit.consequence",
              "action": "对方回`明白`，婚礼和旧账各自归位；本局结算",
              "npcReaction": "对方回`明白`，婚礼和旧账各自归位；本局结算",
              "visibleStateChange": "对方回`明白`，婚礼和旧账各自归位；本局结算 对方回`明白`，婚礼和旧账各自归位；本局结算",
              "nextNodeId": "result"
            }
          },
          {
            "id": "revived-friend.q.transfer-refund.option.receipt-and-candy",
            "label": "玩家确认奶蛙把旧票根和喜糖并排，中间放`≠`",
            "intent": "absurd",
            "stateTags": [
              "ritual-object-logic",
              "ritual-separated"
            ],
            "sourceRefs": [
              "RF-S05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "玩家确认奶蛙把旧票根和喜糖并排，中间放`≠`",
            "consequence": {
              "id": "revived-friend.q.transfer-refund.option.receipt-and-candy.consequence",
              "action": "两个物件不再互相抵扣，对方不再催决定；本局结算",
              "npcReaction": "两个物件不再互相抵扣，对方不再催决定；本局结算",
              "visibleStateChange": "两个物件不再互相抵扣，对方不再催决定；本局结算 两个物件不再互相抵扣，对方不再催决定；本局结算",
              "nextNodeId": "result"
            }
          }
        ],
        "sceneObjects": [
          "旧朋友圈",
          "共同好友",
          "请帖链接",
          "喜糖",
          "旧转账",
          "关系痕迹"
        ],
        "contentVersion": "revived-friend.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "revived-friend.q.transfer-dont-open": {
        "id": "revived-friend.q.transfer-dont-open",
        "routeId": "revived-friend",
        "stage": 5,
        "prompt": "对方只说：我好像还欠你一笔，但也可能早就还了。算了。 旧记录仍关着。你要不要让这扇门继续关？",
        "sourceRefs": [
          "RF-S05",
          "RF-S07"
        ],
        "options": [
          {
            "id": "revived-friend.q.transfer-dont-open.option.keep-closed",
            "label": "我不翻了。旧账到这，婚礼和以后联系另算。",
            "intent": "normal",
            "stateTags": [
              "record-context",
              "old-account-closed"
            ],
            "sourceRefs": [
              "RF-S05",
              "RF-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "我不翻了。旧账到这，婚礼和以后联系另算。",
            "consequence": {
              "id": "revived-friend.q.transfer-dont-open.option.keep-closed.consequence",
              "action": "记录保持私人，对方直接问`那以后还能偶尔联系吗？`",
              "npcReaction": "记录保持私人，对方直接问`那以后还能偶尔联系吗？`",
              "visibleStateChange": "记录保持私人，对方直接问`那以后还能偶尔联系吗？` 记录保持私人，对方直接问`那以后还能偶尔联系吗？`",
              "nextNodeId": "revived-friend.q.relation-next"
            }
          },
          {
            "id": "revived-friend.q.transfer-dont-open.option.their-screenshot",
            "label": "你真想确认，就发你那边金额和备注；别发别人的记录。",
            "intent": "boundary",
            "stateTags": [
              "limited-open",
              "privacy-preserved"
            ],
            "sourceRefs": [
              "RF-S05",
              "RF-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "你真想确认，就发你那边金额和备注；别发别人的记录。",
            "consequence": {
              "id": "revived-friend.q.transfer-dont-open.option.their-screenshot.consequence",
              "action": "对方只发自己的页面，信息不扩散；本局结算",
              "npcReaction": "对方只发自己的页面，信息不扩散；本局结算",
              "visibleStateChange": "对方只发自己的页面，信息不扩散；本局结算 对方只发自己的页面，信息不扩散；本局结算",
              "nextNodeId": "result"
            }
          },
          {
            "id": "revived-friend.q.transfer-dont-open.option.name-before-money",
            "label": "如果你想结账，先说名目，别直接转。",
            "intent": "strategy",
            "stateTags": [
              "purpose-first",
              "no-transfer"
            ],
            "sourceRefs": [
              "RF-S05",
              "RF-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "如果你想结账，先说名目，别直接转。",
            "consequence": {
              "id": "revived-friend.q.transfer-dont-open.option.name-before-money.consequence",
              "action": "对方说清是打车，转账动作没有发生；本局结算",
              "npcReaction": "对方说清是打车，转账动作没有发生；本局结算",
              "visibleStateChange": "对方说清是打车，转账动作没有发生；本局结算 对方说清是打车，转账动作没有发生；本局结算",
              "nextNodeId": "result"
            }
          },
          {
            "id": "revived-friend.q.transfer-dont-open.option.no-subscription",
            "label": "玩家确认奶蛙给关闭的记录盖章：`不可作为关系续费券`",
            "intent": "absurd",
            "stateTags": [
              "ritual-object-logic",
              "record-not-opened"
            ],
            "sourceRefs": [
              "RF-S05",
              "RF-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "玩家确认奶蛙给关闭的记录盖章：`不可作为关系续费券`",
            "consequence": {
              "id": "revived-friend.q.transfer-dont-open.option.no-subscription.consequence",
              "action": "旧转账仍是旧转账，没有自动续费关系；本局结算",
              "npcReaction": "旧转账仍是旧转账，没有自动续费关系；本局结算",
              "visibleStateChange": "旧转账仍是旧转账，没有自动续费关系；本局结算 旧转账仍是旧转账，没有自动续费关系；本局结算",
              "nextNodeId": "result"
            }
          }
        ],
        "sceneObjects": [
          "旧朋友圈",
          "共同好友",
          "请帖链接",
          "喜糖",
          "旧转账",
          "关系痕迹"
        ],
        "contentVersion": "revived-friend.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "revived-friend.q.relation-next": {
        "id": "revived-friend.q.relation-next",
        "routeId": "revived-friend",
        "stage": 6,
        "prompt": "旧同学最后问：这次不管你来不来，之后还能偶尔联系吗？ 现在没有链接、糖或旧账替你回答。",
        "sourceRefs": [
          "RF-S03",
          "RF-S07"
        ],
        "options": [
          {
            "id": "revived-friend.q.relation-next.option.warm",
            "label": "可以。别只等红白喜事，平时看到老店也能发。",
            "intent": "normal",
            "stateTags": [
              "warm-reopen",
              "relationship-open"
            ],
            "sourceRefs": [
              "RF-S03",
              "RF-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "可以。别只等红白喜事，平时看到老店也能发。",
            "consequence": {
              "id": "revived-friend.q.relation-next.option.warm.consequence",
              "action": "对话置顶没有自动发生，但旧面馆被加入双方都能主动提起的话题；本局结算",
              "npcReaction": "对话置顶没有自动发生，但旧面馆被加入双方都能主动提起的话题；本局结算",
              "visibleStateChange": "对话置顶没有自动发生，但旧面馆被加入双方都能主动提起的话题；本局结算 对话置顶没有自动发生，但旧面馆被加入双方都能主动提起的话题；本局结算",
              "nextNodeId": "result"
            }
          },
          {
            "id": "revived-friend.q.relation-next.option.limited",
            "label": "可以偶尔聊，我不一定及时回。",
            "intent": "strategy",
            "stateTags": [
              "limited-open",
              "response-boundary"
            ],
            "sourceRefs": [
              "RF-S03",
              "RF-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "可以偶尔聊，我不一定及时回。",
            "consequence": {
              "id": "revived-friend.q.relation-next.option.limited.consequence",
              "action": "关系只开一条窄缝，没有恢复成每日联系人；本局结算",
              "npcReaction": "关系只开一条窄缝，没有恢复成每日联系人；本局结算",
              "visibleStateChange": "关系只开一条窄缝，没有恢复成每日联系人；本局结算 关系只开一条窄缝，没有恢复成每日联系人；本局结算",
              "nextNodeId": "result"
            }
          },
          {
            "id": "revived-friend.q.relation-next.option.closed",
            "label": "我现在不太想重新打开关系。还是祝你婚礼顺利。",
            "intent": "boundary",
            "stateTags": [
              "closed-boundary",
              "relationship-closed"
            ],
            "sourceRefs": [
              "RF-S03",
              "RF-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "我现在不太想重新打开关系。还是祝你婚礼顺利。",
            "consequence": {
              "id": "revived-friend.q.relation-next.option.closed.consequence",
              "action": "祝福留下，链接、糖和旧账都没有迫使关系复活；本局结算",
              "npcReaction": "祝福留下，链接、糖和旧账都没有迫使关系复活；本局结算",
              "visibleStateChange": "祝福留下，链接、糖和旧账都没有迫使关系复活；本局结算 祝福留下，链接、糖和旧账都没有迫使关系复活；本局结算",
              "nextNodeId": "result"
            }
          },
          {
            "id": "revived-friend.q.relation-next.option.twice-a-year",
            "label": "先从一年两次开始：生日一次，这家面馆要是复活再一次。",
            "intent": "absurd",
            "stateTags": [
              "ritual-object-logic",
              "relationship-limited"
            ],
            "sourceRefs": [
              "RF-S03",
              "RF-S07"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "先从一年两次开始：生日一次，这家面馆要是复活再一次。",
            "consequence": {
              "id": "revived-friend.q.relation-next.option.twice-a-year.consequence",
              "action": "奶蛙在日历只留两个空槽，没有替双方填第三次；本局结算",
              "npcReaction": "奶蛙在日历只留两个空槽，没有替双方填第三次；本局结算",
              "visibleStateChange": "奶蛙在日历只留两个空槽，没有替双方填第三次；本局结算 奶蛙在日历只留两个空槽，没有替双方填第三次；本局结算",
              "nextNodeId": "result"
            }
          }
        ],
        "sceneObjects": [
          "旧朋友圈",
          "共同好友",
          "请帖链接",
          "喜糖",
          "旧转账",
          "关系痕迹"
        ],
        "contentVersion": "revived-friend.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      }
    },
    "canonicalPath": [
      "revived-friend.q.old-trace.option.warm",
      "revived-friend.q.mutual-warm.option.direct",
      "revived-friend.q.invite-direct.option.received-not-rsvp",
      "revived-friend.q.encounter-candy.option.confirm-only",
      "revived-friend.q.transfer-aa.option.open-context",
      "revived-friend.q.relation-next.option.warm"
    ]
  },
  "family-care": {
    "id": "family-care",
    "title": "家里人开始关心你",
    "subtitle": "一顿回家饭，不断增加东西、问题和亲戚",
    "contentVersion": "family-care.graph.preview.2026-07-22.v1",
    "startNodeId": "family-care.q.invite",
    "allowedSceneObjects": [
      "家族群",
      "排骨",
      "快递",
      "餐桌",
      "亲戚手机",
      "视频镜头",
      "饭盒"
    ],
    "questions": {
      "family-care.q.invite": {
        "id": "family-care.q.invite",
        "routeId": "family-care",
        "sourceRefs": [
          "FAM-04",
          "FAM-05"
        ],
        "options": [
          {
            "id": "family-care.q.invite.option.lunch",
            "label": "回，中午到。少做两个菜，真吃不完。",
            "intent": "normal",
            "stateTags": [
              "warm"
            ],
            "sourceRefs": [
              "FAM-04",
              "FAM-05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "回，中午到。少做两个菜，真吃不完。",
            "consequence": {
              "id": "family-care.c.invite.lunch",
              "action": "奶蛙把排骨照片缩成半盘，给日历圈上周日中午",
              "npcReaction": "妈妈回“行”，两秒后又补“那汤不算菜”",
              "visibleStateChange": "奶蛙把排骨照片缩成半盘，给日历圈上周日中午 妈妈回“行”，两秒后又补“那汤不算菜”",
              "nextNodeId": "family-care.q.parcel.warm"
            }
          },
          {
            "id": "family-care.q.invite.option.leave-three",
            "label": "能回，但三点前得走，晚上有安排。",
            "intent": "boundary",
            "stateTags": [
              "boundary"
            ],
            "sourceRefs": [
              "FAM-04",
              "FAM-05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "能回，但三点前得走，晚上有安排。",
            "consequence": {
              "id": "family-care.c.invite.leave-three",
              "action": "奶蛙在餐桌模型上插一面“15:00”小旗",
              "npcReaction": "爸爸回“知道了，早点开饭”",
              "visibleStateChange": "奶蛙在餐桌模型上插一面“15:00”小旗 爸爸回“知道了，早点开饭”",
              "nextNodeId": "family-care.q.parcel.boundary"
            }
          },
          {
            "id": "family-care.q.invite.option.headcount",
            "label": "都谁来？我按人数带点水果。",
            "intent": "strategy",
            "stateTags": [
              "strategy"
            ],
            "sourceRefs": [
              "FAM-04",
              "FAM-05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "都谁来？我按人数带点水果。",
            "consequence": {
              "id": "family-care.c.invite.headcount",
              "action": "奶蛙把群成员头像排成座位图，空出玩家的位置",
              "npcReaction": "妈妈报出四个人，又说“你姑可能带一个朋友”",
              "visibleStateChange": "奶蛙把群成员头像排成座位图，空出玩家的位置 妈妈报出四个人，又说“你姑可能带一个朋友”",
              "nextNodeId": "family-care.q.parcel.strategy"
            }
          },
          {
            "id": "family-care.q.invite.option.empty-boxes",
            "label": "回。我带七个空饭盒，谁做多了谁负责装。",
            "intent": "absurd",
            "stateTags": [
              "absurd"
            ],
            "sourceRefs": [
              "FAM-04",
              "FAM-05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "回。我带七个空饭盒，谁做多了谁负责装。",
            "consequence": {
              "id": "family-care.c.invite.empty-boxes",
              "action": "奶蛙把七个空盒摞成塔，最上面贴“后果自负”",
              "npcReaction": "姑姑先发了一个笑哭，妈妈问“你是不是早有预谋”",
              "visibleStateChange": "奶蛙把七个空盒摞成塔，最上面贴“后果自负” 姑姑先发了一个笑哭，妈妈问“你是不是早有预谋”",
              "nextNodeId": "family-care.q.parcel.absurd"
            }
          }
        ],
        "stage": 1,
        "prompt": "家族群里，妈妈发：周日回来吃饭，你爸菜都买了。你姑也来。爸爸跟着发了一张占满砧板的排骨照。你怎么回？",
        "sceneObjects": [
          "家族群",
          "排骨",
          "快递",
          "餐桌",
          "亲戚手机",
          "视频镜头",
          "饭盒"
        ],
        "contentVersion": "family-care.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "family-care.q.parcel.warm": {
        "id": "family-care.q.parcel.warm",
        "routeId": "family-care",
        "sourceRefs": [
          "FAM-01",
          "FAM-02"
        ],
        "options": [
          {
            "id": "family-care.q.parcel.warm.option.accept-one",
            "label": "茶我先留一盒，其他周日带回去一起分。",
            "intent": "normal",
            "stateTags": [
              "warm"
            ],
            "sourceRefs": [
              "FAM-01",
              "FAM-02"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "茶我先留一盒，其他周日带回去一起分。",
            "consequence": {
              "id": "family-care.c.parcel.warm.accept-one",
              "action": "奶蛙只把一盒放进橱柜，其余重新封箱",
              "npcReaction": "妈妈回“行，你先别空腹喝”",
              "visibleStateChange": "奶蛙只把一盒放进橱柜，其余重新封箱 妈妈回“行，你先别空腹喝”",
              "nextNodeId": "family-care.q.dinner.warm"
            }
          },
          {
            "id": "family-care.q.parcel.warm.option.pause",
            "label": "成分没写清的我先不喝，别再下单了。",
            "intent": "boundary",
            "stateTags": [
              "boundary"
            ],
            "sourceRefs": [
              "FAM-01",
              "FAM-02"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "成分没写清的我先不喝，别再下单了。",
            "consequence": {
              "id": "family-care.c.parcel.warm.pause",
              "action": "奶蛙把赠品卡夹到“待核实”板上",
              "npcReaction": "妈妈沉默一会儿，回“那你带回来”",
              "visibleStateChange": "奶蛙把赠品卡夹到“待核实”板上 妈妈沉默一会儿，回“那你带回来”",
              "nextNodeId": "family-care.q.dinner.boundary"
            }
          },
          {
            "id": "family-care.q.parcel.warm.option.order",
            "label": "把订单截图发我，我先看成分和退货时间。",
            "intent": "strategy",
            "stateTags": [
              "strategy"
            ],
            "sourceRefs": [
              "FAM-01",
              "FAM-02"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "把订单截图发我，我先看成分和退货时间。",
            "consequence": {
              "id": "family-care.c.parcel.warm.order",
              "action": "奶蛙展开订单页，圈出成分、商家和退货倒计时",
              "npcReaction": "妈妈把直播间截图发来，才发现是买一送五",
              "visibleStateChange": "奶蛙展开订单页，圈出成分、商家和退货倒计时 妈妈把直播间截图发来，才发现是买一送五",
              "nextNodeId": "family-care.q.dinner.strategy"
            }
          },
          {
            "id": "family-care.q.parcel.warm.option.reader",
            "label": "周日带回去。谁推荐的，谁先当众读完说明书。",
            "intent": "absurd",
            "stateTags": [
              "absurd"
            ],
            "sourceRefs": [
              "FAM-01",
              "FAM-02"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "周日带回去。谁推荐的，谁先当众读完说明书。",
            "consequence": {
              "id": "family-care.c.parcel.warm.reader",
              "action": "奶蛙给六盒茶贴上六个家人姓名签",
              "npcReaction": "爸爸在群里说“这个规则我支持”",
              "visibleStateChange": "奶蛙给六盒茶贴上六个家人姓名签 爸爸在群里说“这个规则我支持”",
              "nextNodeId": "family-care.q.dinner.absurd"
            }
          }
        ],
        "stage": 2,
        "prompt": "周六快递到了：六盒祛湿茶、两包泡脚包，还有一张没写成分的直播间赠品卡。妈妈说“先喝着，最近湿气重”。你怎么处理？",
        "sceneObjects": [
          "家族群",
          "排骨",
          "快递",
          "餐桌",
          "亲戚手机",
          "视频镜头",
          "饭盒"
        ],
        "contentVersion": "family-care.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "family-care.q.parcel.boundary": {
        "id": "family-care.q.parcel.boundary",
        "routeId": "family-care",
        "sourceRefs": [
          "FAM-01",
          "FAM-02"
        ],
        "options": [
          {
            "id": "family-care.q.parcel.boundary.option.sign",
            "label": "先签收，我周日原样带回去，别让你白跑退件。",
            "intent": "normal",
            "stateTags": [
              "warm"
            ],
            "sourceRefs": [
              "FAM-01",
              "FAM-02"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "先签收，我周日原样带回去，别让你白跑退件。",
            "consequence": {
              "id": "family-care.c.parcel.boundary.sign",
              "action": "奶蛙在箱角贴“未开封，周日返家”",
              "npcReaction": "妈妈回“你别嫌我操心就行”",
              "visibleStateChange": "奶蛙在箱角贴“未开封，周日返家” 妈妈回“你别嫌我操心就行”",
              "nextNodeId": "family-care.q.dinner.warm"
            }
          },
          {
            "id": "family-care.q.parcel.boundary.option.refuse",
            "label": "我不方便收。你联系商家改地址或退掉吧。",
            "intent": "boundary",
            "stateTags": [
              "boundary"
            ],
            "sourceRefs": [
              "FAM-01",
              "FAM-02"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "我不方便收。你联系商家改地址或退掉吧。",
            "consequence": {
              "id": "family-care.c.parcel.boundary.refuse",
              "action": "玩家确认拒收后，奶蛙把快递单翻到退回面",
              "npcReaction": "妈妈有点失落，但去找客服",
              "visibleStateChange": "玩家确认拒收后，奶蛙把快递单翻到退回面 妈妈有点失落，但去找客服",
              "nextNodeId": "family-care.q.dinner.boundary"
            }
          },
          {
            "id": "family-care.q.parcel.boundary.option.check",
            "label": "先别拆，发订单号。我查清楚再决定收不收。",
            "intent": "strategy",
            "stateTags": [
              "strategy"
            ],
            "sourceRefs": [
              "FAM-01",
              "FAM-02"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "先别拆，发订单号。我查清楚再决定收不收。",
            "consequence": {
              "id": "family-care.c.parcel.boundary.check",
              "action": "奶蛙把订单号和说明书搜索结果并排",
              "npcReaction": "妈妈说“那你看，合适就留”",
              "visibleStateChange": "奶蛙把订单号和说明书搜索结果并排 妈妈说“那你看，合适就留”",
              "nextNodeId": "family-care.q.dinner.strategy"
            }
          },
          {
            "id": "family-care.q.parcel.boundary.option.frontdesk",
            "label": "签。让奶蛙给杯子贴“本公司拒绝代谢湿气”。",
            "intent": "absurd",
            "stateTags": [
              "absurd"
            ],
            "sourceRefs": [
              "FAM-01",
              "FAM-02"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "签。让奶蛙给杯子贴“本公司拒绝代谢湿气”。",
            "consequence": {
              "id": "family-care.c.parcel.boundary.frontdesk",
              "action": "赠品杯被放进前台失物招领盘，标签正对镜头",
              "npcReaction": "前台笑出声，妈妈发来三个问号",
              "visibleStateChange": "赠品杯被放进前台失物招领盘，标签正对镜头 前台笑出声，妈妈发来三个问号",
              "nextNodeId": "family-care.q.dinner.absurd"
            }
          }
        ],
        "stage": 2,
        "prompt": "你刚说三点前走，妈妈又把养生快递寄到公司：茶包、膏贴和一只写着“惊喜”的赠品杯。前台问要不要签收。",
        "sceneObjects": [
          "家族群",
          "排骨",
          "快递",
          "餐桌",
          "亲戚手机",
          "视频镜头",
          "饭盒"
        ],
        "contentVersion": "family-care.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "family-care.q.parcel.strategy": {
        "id": "family-care.q.parcel.strategy",
        "routeId": "family-care",
        "sourceRefs": [
          "FAM-01",
          "FAM-02"
        ],
        "options": [
          {
            "id": "family-care.q.parcel.strategy.option.keep",
            "label": "先收着，周日谁想要谁拿，不硬分。",
            "intent": "normal",
            "stateTags": [
              "warm"
            ],
            "sourceRefs": [
              "FAM-01",
              "FAM-02"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "先收着，周日谁想要谁拿，不硬分。",
            "consequence": {
              "id": "family-care.c.parcel.strategy.keep",
              "action": "奶蛙把八盒摆成自取区，拿走姓名贴",
              "npcReaction": "妈妈接受了“自愿拿”的说法",
              "visibleStateChange": "奶蛙把八盒摆成自取区，拿走姓名贴 妈妈接受了“自愿拿”的说法",
              "nextNodeId": "family-care.q.dinner.warm"
            }
          },
          {
            "id": "family-care.q.parcel.strategy.option.no-gift",
            "label": "我不替没见过的人收这个，陌生那盒退掉。",
            "intent": "boundary",
            "stateTags": [
              "boundary"
            ],
            "sourceRefs": [
              "FAM-01",
              "FAM-02"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "我不替没见过的人收这个，陌生那盒退掉。",
            "consequence": {
              "id": "family-care.c.parcel.strategy.no-gift",
              "action": "奶蛙把第八盒移出座位图",
              "npcReaction": "姑姑说“也是，别给人压力”",
              "visibleStateChange": "奶蛙把第八盒移出座位图 姑姑说“也是，别给人压力”",
              "nextNodeId": "family-care.q.dinner.boundary"
            }
          },
          {
            "id": "family-care.q.parcel.strategy.option.verify",
            "label": "先把商品页发群里，大家看完再报要不要。",
            "intent": "strategy",
            "stateTags": [
              "strategy"
            ],
            "sourceRefs": [
              "FAM-01",
              "FAM-02"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "先把商品页发群里，大家看完再报要不要。",
            "consequence": {
              "id": "family-care.c.parcel.strategy.verify",
              "action": "家族群出现一张成分、价格、退货期三栏卡",
              "npcReaction": "爸爸第一个回“我不要甜的”",
              "visibleStateChange": "家族群出现一张成分、价格、退货期三栏卡 爸爸第一个回“我不要甜的”",
              "nextNodeId": "family-care.q.dinner.strategy"
            }
          },
          {
            "id": "family-care.q.parcel.strategy.option.number",
            "label": "八盒都编号，周日抽中谁，谁负责查那盒。",
            "intent": "absurd",
            "stateTags": [
              "absurd"
            ],
            "sourceRefs": [
              "FAM-01",
              "FAM-02"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "八盒都编号，周日抽中谁，谁负责查那盒。",
            "consequence": {
              "id": "family-care.c.parcel.strategy.number",
              "action": "奶蛙把快递盒变成八号盲抽签筒",
              "npcReaction": "妈妈把“惊喜”撤回，改口叫“家庭作业”",
              "visibleStateChange": "奶蛙把快递盒变成八号盲抽签筒 妈妈把“惊喜”撤回，改口叫“家庭作业”",
              "nextNodeId": "family-care.q.dinner.absurd"
            }
          }
        ],
        "stage": 2,
        "prompt": "座位还没数清，妈妈先把养生快递单发来：“一家一盒，正好。”订单却显示共八盒，姑姑那个朋友也有份。",
        "sceneObjects": [
          "家族群",
          "排骨",
          "快递",
          "餐桌",
          "亲戚手机",
          "视频镜头",
          "饭盒"
        ],
        "contentVersion": "family-care.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "family-care.q.parcel.absurd": {
        "id": "family-care.q.parcel.absurd",
        "routeId": "family-care",
        "sourceRefs": [
          "FAM-01",
          "FAM-02"
        ],
        "options": [
          {
            "id": "family-care.q.parcel.absurd.option.share",
            "label": "先带回去，愿意尝的分，没人要就不再买。",
            "intent": "normal",
            "stateTags": [
              "warm"
            ],
            "sourceRefs": [
              "FAM-01",
              "FAM-02"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "先带回去，愿意尝的分，没人要就不再买。",
            "consequence": {
              "id": "family-care.c.parcel.absurd.share",
              "action": "奶蛙把空饭盒和养生箱分成两摞，不混装",
              "npcReaction": "妈妈回“行，不强塞”",
              "visibleStateChange": "奶蛙把空饭盒和养生箱分成两摞，不混装 妈妈回“行，不强塞”",
              "nextNodeId": "family-care.q.dinner.warm"
            }
          },
          {
            "id": "family-care.q.parcel.absurd.option.stop",
            "label": "饭盒装菜，养生箱原封退。两件事别绑一起。",
            "intent": "boundary",
            "stateTags": [
              "boundary"
            ],
            "sourceRefs": [
              "FAM-01",
              "FAM-02"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "饭盒装菜，养生箱原封退。两件事别绑一起。",
            "consequence": {
              "id": "family-care.c.parcel.absurd.stop",
              "action": "奶蛙在地上拉出“饭”和“货”两条胶带边界",
              "npcReaction": "爸爸点了个赞，妈妈去问退货",
              "visibleStateChange": "奶蛙在地上拉出“饭”和“货”两条胶带边界 爸爸点了个赞，妈妈去问退货",
              "nextNodeId": "family-care.q.dinner.boundary"
            }
          },
          {
            "id": "family-care.q.parcel.absurd.option.inventory",
            "label": "先登记谁买、多少钱、谁真需要，再决定留几盒。",
            "intent": "strategy",
            "stateTags": [
              "strategy"
            ],
            "sourceRefs": [
              "FAM-01",
              "FAM-02"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "先登记谁买、多少钱、谁真需要，再决定留几盒。",
            "consequence": {
              "id": "family-care.c.parcel.absurd.inventory",
              "action": "奶蛙在盒盖贴购买人、价格、去向三栏",
              "npcReaction": "姑姑承认自己也跟着下过单",
              "visibleStateChange": "奶蛙在盒盖贴购买人、价格、去向三栏 姑姑承认自己也跟着下过单",
              "nextNodeId": "family-care.q.dinner.strategy"
            }
          },
          {
            "id": "family-care.q.parcel.absurd.option.exhibit",
            "label": "带回去办“家庭养生展”，每件展品先讲证据再领走。",
            "intent": "absurd",
            "stateTags": [
              "absurd"
            ],
            "sourceRefs": [
              "FAM-01",
              "FAM-02"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "带回去办“家庭养生展”，每件展品先讲证据再领走。",
            "consequence": {
              "id": "family-care.c.parcel.absurd.exhibit",
              "action": "奶蛙把泡脚包竖进饭盒，做成迷你展柜",
              "npcReaction": "家族群开始给展览起名",
              "visibleStateChange": "奶蛙把泡脚包竖进饭盒，做成迷你展柜 家族群开始给展览起名",
              "nextNodeId": "family-care.q.dinner.absurd"
            }
          }
        ],
        "stage": 2,
        "prompt": "七个空饭盒刚摞好，门口又来一箱“夏季养生组合”。妈妈在群里说：“正好，盒子别空着。”",
        "sceneObjects": [
          "家族群",
          "排骨",
          "快递",
          "餐桌",
          "亲戚手机",
          "视频镜头",
          "饭盒"
        ],
        "contentVersion": "family-care.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "family-care.q.dinner.warm": {
        "id": "family-care.q.dinner.warm",
        "routeId": "family-care",
        "sourceRefs": [
          "FAM-04",
          "FAM-05"
        ],
        "options": [
          {
            "id": "family-care.q.dinner.warm.option.one-update",
            "label": "还行，这阵确实忙。今天先好好吃饭。",
            "intent": "normal",
            "stateTags": [
              "warm"
            ],
            "sourceRefs": [
              "FAM-04",
              "FAM-05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "还行，这阵确实忙。今天先好好吃饭。",
            "consequence": {
              "id": "family-care.c.dinner.warm.one-update",
              "action": "奶蛙接住排骨，把手机屏幕扣下",
              "npcReaction": "爸爸嗯了一声，转而问菜够不够咸",
              "visibleStateChange": "奶蛙接住排骨，把手机屏幕扣下 爸爸嗯了一声，转而问菜够不够咸",
              "nextNodeId": "family-care.q.relative.warm"
            }
          },
          {
            "id": "family-care.q.dinner.warm.option.not-now",
            "label": "工作先不展开，等我想说了再单独聊。",
            "intent": "boundary",
            "stateTags": [
              "boundary"
            ],
            "sourceRefs": [
              "FAM-04",
              "FAM-05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "工作先不展开，等我想说了再单独聊。",
            "consequence": {
              "id": "family-care.c.dinner.warm.not-now",
              "action": "奶蛙把“工作”两字折进餐巾，不碰碗筷",
              "npcReaction": "妈妈替你说“那先吃饭”",
              "visibleStateChange": "奶蛙把“工作”两字折进餐巾，不碰碗筷 妈妈替你说“那先吃饭”",
              "nextNodeId": "family-care.q.relative.boundary"
            }
          },
          {
            "id": "family-care.q.dinner.warm.option.exchange",
            "label": "我说一件近况，你们也一人说一件，轮着来。",
            "intent": "strategy",
            "stateTags": [
              "strategy"
            ],
            "sourceRefs": [
              "FAM-04",
              "FAM-05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "我说一件近况，你们也一人说一件，轮着来。",
            "consequence": {
              "id": "family-care.c.dinner.warm.exchange",
              "action": "奶蛙把转盘分成五格，排骨停在发言人面前",
              "npcReaction": "爸爸先说了最近膝盖好多了，桌面不再只盯你",
              "visibleStateChange": "奶蛙把转盘分成五格，排骨停在发言人面前 爸爸先说了最近膝盖好多了，桌面不再只盯你",
              "nextNodeId": "family-care.q.relative.strategy"
            }
          },
          {
            "id": "family-care.q.dinner.warm.option.rib-mic",
            "label": "让奶蛙举着排骨当话筒，拿到的人只能说自己的近况。",
            "intent": "absurd",
            "stateTags": [
              "absurd"
            ],
            "sourceRefs": [
              "FAM-04",
              "FAM-05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "让奶蛙举着排骨当话筒，拿到的人只能说自己的近况。",
            "consequence": {
              "id": "family-care.c.dinner.warm.rib-mic",
              "action": "排骨被夹在小支架上绕桌一圈",
              "npcReaction": "姑姑笑着接话筒，先讲起自己换眼镜",
              "visibleStateChange": "排骨被夹在小支架上绕桌一圈 姑姑笑着接话筒，先讲起自己换眼镜",
              "nextNodeId": "family-care.q.relative.absurd"
            }
          }
        ],
        "stage": 3,
        "prompt": "周日开饭。爸爸夹来最大的一块排骨，问：“最近工作到底怎么样？看你总说忙。”桌上是真的担心，也有四双等答案的眼睛。",
        "sceneObjects": [
          "家族群",
          "排骨",
          "快递",
          "餐桌",
          "亲戚手机",
          "视频镜头",
          "饭盒"
        ],
        "contentVersion": "family-care.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "family-care.q.dinner.boundary": {
        "id": "family-care.q.dinner.boundary",
        "routeId": "family-care",
        "sourceRefs": [
          "FAM-04",
          "FAM-05"
        ],
        "options": [
          {
            "id": "family-care.q.dinner.boundary.option.reassure",
            "label": "没出事，就是累。等会儿洗碗时我跟你说两句。",
            "intent": "normal",
            "stateTags": [
              "warm"
            ],
            "sourceRefs": [
              "FAM-04",
              "FAM-05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "没出事，就是累。等会儿洗碗时我跟你说两句。",
            "consequence": {
              "id": "family-care.c.dinner.boundary.reassure",
              "action": "奶蛙把两只待洗的碗放到厨房边，标“私聊”",
              "npcReaction": "妈妈放下心，没在桌上追问",
              "visibleStateChange": "奶蛙把两只待洗的碗放到厨房边，标“私聊” 妈妈放下心，没在桌上追问",
              "nextNodeId": "family-care.q.relative.warm"
            }
          },
          {
            "id": "family-care.q.dinner.boundary.option.close",
            "label": "真没事，但今天不聊工作。你别替我猜。",
            "intent": "boundary",
            "stateTags": [
              "boundary"
            ],
            "sourceRefs": [
              "FAM-04",
              "FAM-05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "真没事，但今天不聊工作。你别替我猜。",
            "consequence": {
              "id": "family-care.c.dinner.boundary.close",
              "action": "奶蛙把厨房门上的问号擦掉",
              "npcReaction": "妈妈说“好”，给你添了半碗汤",
              "visibleStateChange": "奶蛙把厨房门上的问号擦掉 妈妈说“好”，给你添了半碗汤",
              "nextNodeId": "family-care.q.relative.boundary"
            }
          },
          {
            "id": "family-care.q.dinner.boundary.option.timebox",
            "label": "吃完给你十分钟，只讲你最担心的一个问题。",
            "intent": "strategy",
            "stateTags": [
              "strategy"
            ],
            "sourceRefs": [
              "FAM-04",
              "FAM-05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "吃完给你十分钟，只讲你最担心的一个问题。",
            "consequence": {
              "id": "family-care.c.dinner.boundary.timebox",
              "action": "奶蛙翻出十分钟沙漏，旁边只留一张问题卡",
              "npcReaction": "妈妈认真想了想，问题从五个缩成一个",
              "visibleStateChange": "奶蛙翻出十分钟沙漏，旁边只留一张问题卡 妈妈认真想了想，问题从五个缩成一个",
              "nextNodeId": "family-care.q.relative.strategy"
            }
          },
          {
            "id": "family-care.q.dinner.boundary.option.bowl-lid",
            "label": "把空汤碗扣上：碗盖没开，工作频道不开。",
            "intent": "absurd",
            "stateTags": [
              "absurd"
            ],
            "sourceRefs": [
              "FAM-04",
              "FAM-05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "把空汤碗扣上：碗盖没开，工作频道不开。",
            "consequence": {
              "id": "family-care.c.dinner.boundary.bowl-lid",
              "action": "奶蛙给扣着的碗插一根“暂停营业”牙签旗",
              "npcReaction": "妈妈笑骂一句，真的没再问",
              "visibleStateChange": "奶蛙给扣着的碗插一根“暂停营业”牙签旗 妈妈笑骂一句，真的没再问",
              "nextNodeId": "family-care.q.relative.absurd"
            }
          }
        ],
        "stage": 3,
        "prompt": "妈妈记得你三点要走，刚开饭就压低声音问：“是不是工作出什么事了？不方便就在厨房跟我说。”",
        "sceneObjects": [
          "家族群",
          "排骨",
          "快递",
          "餐桌",
          "亲戚手机",
          "视频镜头",
          "饭盒"
        ],
        "contentVersion": "family-care.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "family-care.q.dinner.strategy": {
        "id": "family-care.q.dinner.strategy",
        "routeId": "family-care",
        "sourceRefs": [
          "FAM-04",
          "FAM-05"
        ],
        "options": [
          {
            "id": "family-care.q.dinner.strategy.option.short",
            "label": "我简单说两句，大家别替我下结论就行。",
            "intent": "normal",
            "stateTags": [
              "warm"
            ],
            "sourceRefs": [
              "FAM-04",
              "FAM-05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "我简单说两句，大家别替我下结论就行。",
            "consequence": {
              "id": "family-care.c.dinner.strategy.short",
              "action": "奶蛙在桌中央立一张“两句”卡",
              "npcReaction": "家人点头，爸爸只追问了一句",
              "visibleStateChange": "奶蛙在桌中央立一张“两句”卡 家人点头，爸爸只追问了一句",
              "nextNodeId": "family-care.q.relative.warm"
            }
          },
          {
            "id": "family-care.q.dinner.strategy.option.skip",
            "label": "今天跳过工作，问我别的都行。",
            "intent": "boundary",
            "stateTags": [
              "boundary"
            ],
            "sourceRefs": [
              "FAM-04",
              "FAM-05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "今天跳过工作，问我别的都行。",
            "consequence": {
              "id": "family-care.c.dinner.strategy.skip",
              "action": "奶蛙从转盘上拿掉“工作”格，留下电影、天气和菜",
              "npcReaction": "姑姑改问你最近看了什么",
              "visibleStateChange": "奶蛙从转盘上拿掉“工作”格，留下电影、天气和菜 姑姑改问你最近看了什么",
              "nextNodeId": "family-care.q.relative.boundary"
            }
          },
          {
            "id": "family-care.q.dinner.strategy.option.round",
            "label": "一人一个问题，问完也要答同类问题。",
            "intent": "strategy",
            "stateTags": [
              "strategy"
            ],
            "sourceRefs": [
              "FAM-04",
              "FAM-05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "一人一个问题，问完也要答同类问题。",
            "consequence": {
              "id": "family-care.c.dinner.strategy.round",
              "action": "奶蛙发出五张双面问答牌",
              "npcReaction": "爸爸问加班，随后也交代了自己最近睡得晚",
              "visibleStateChange": "奶蛙发出五张双面问答牌 爸爸问加班，随后也交代了自己最近睡得晚",
              "nextNodeId": "family-care.q.relative.strategy"
            }
          },
          {
            "id": "family-care.q.dinner.strategy.option.menu",
            "label": "把问题写成菜单：工作是凉菜，吃完主食才能点。",
            "intent": "absurd",
            "stateTags": [
              "absurd"
            ],
            "sourceRefs": [
              "FAM-04",
              "FAM-05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "把问题写成菜单：工作是凉菜，吃完主食才能点。",
            "consequence": {
              "id": "family-care.c.dinner.strategy.menu",
              "action": "奶蛙把“工作近况”夹进菜单最后一页",
              "npcReaction": "全桌为了翻页先认真吃了十分钟",
              "visibleStateChange": "奶蛙把“工作近况”夹进菜单最后一页 全桌为了翻页先认真吃了十分钟",
              "nextNodeId": "family-care.q.relative.absurd"
            }
          }
        ],
        "stage": 3,
        "prompt": "座位图最终多出一个人。开饭后姑姑问工作，爸爸也想问，妈妈又怕他们一起问把你吓跑。你怎么定饭桌规则？",
        "sceneObjects": [
          "家族群",
          "排骨",
          "快递",
          "餐桌",
          "亲戚手机",
          "视频镜头",
          "饭盒"
        ],
        "contentVersion": "family-care.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "family-care.q.dinner.absurd": {
        "id": "family-care.q.dinner.absurd",
        "routeId": "family-care",
        "sourceRefs": [
          "FAM-04",
          "FAM-05"
        ],
        "options": [
          {
            "id": "family-care.q.dinner.absurd.option.answer-one",
            "label": "工资不细说，熬夜偶尔有。你们别一起问。",
            "intent": "normal",
            "stateTags": [
              "warm"
            ],
            "sourceRefs": [
              "FAM-04",
              "FAM-05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "工资不细说，熬夜偶尔有。你们别一起问。",
            "consequence": {
              "id": "family-care.c.dinner.absurd.answer-one",
              "action": "奶蛙收走一件展品，只留一只泡脚包在桌上",
              "npcReaction": "爸爸先停下，姑姑也把问题咽回去",
              "visibleStateChange": "奶蛙收走一件展品，只留一只泡脚包在桌上 爸爸先停下，姑姑也把问题咽回去",
              "nextNodeId": "family-care.q.relative.warm"
            }
          },
          {
            "id": "family-care.q.dinner.absurd.option.off-topic",
            "label": "展品能问，工资不展。这个话题到这儿。",
            "intent": "boundary",
            "stateTags": [
              "boundary"
            ],
            "sourceRefs": [
              "FAM-04",
              "FAM-05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "展品能问，工资不展。这个话题到这儿。",
            "consequence": {
              "id": "family-care.c.dinner.absurd.off-topic",
              "action": "奶蛙给工资问题盖上“非展品”红章",
              "npcReaction": "姑姑笑着说“行，审展品”",
              "visibleStateChange": "奶蛙给工资问题盖上“非展品”红章 姑姑笑着说“行，审展品”",
              "nextNodeId": "family-care.q.relative.boundary"
            }
          },
          {
            "id": "family-care.q.dinner.absurd.option.fact-check",
            "label": "先查这盒是谁买的、凭什么买，再轮到问我。",
            "intent": "strategy",
            "stateTags": [
              "strategy"
            ],
            "sourceRefs": [
              "FAM-04",
              "FAM-05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "先查这盒是谁买的、凭什么买，再轮到问我。",
            "consequence": {
              "id": "family-care.c.dinner.absurd.fact-check",
              "action": "奶蛙翻开订单页，把问题箭头转向购买人",
              "npcReaction": "爸爸开始追问直播间退款，注意力自然转开",
              "visibleStateChange": "奶蛙翻开订单页，把问题箭头转向购买人 爸爸开始追问直播间退款，注意力自然转开",
              "nextNodeId": "family-care.q.relative.strategy"
            }
          },
          {
            "id": "family-care.q.dinner.absurd.option.curator",
            "label": "宣布展馆规定：提私人问题，要先捐一只饭盒。",
            "intent": "absurd",
            "stateTags": [
              "absurd"
            ],
            "sourceRefs": [
              "FAM-04",
              "FAM-05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "宣布展馆规定：提私人问题，要先捐一只饭盒。",
            "consequence": {
              "id": "family-care.c.dinner.absurd.curator",
              "action": "桌边很快排出三只被“捐”的空饭盒",
              "npcReaction": "妈妈一边笑一边真把饭盒收走",
              "visibleStateChange": "桌边很快排出三只被“捐”的空饭盒 妈妈一边笑一边真把饭盒收走",
              "nextNodeId": "family-care.q.relative.absurd"
            }
          }
        ],
        "stage": 3,
        "prompt": "“家庭养生展”开场三分钟就跑题。姑姑举着祛湿茶问你工资，爸爸拿着泡脚包问你是不是经常熬夜。",
        "sceneObjects": [
          "家族群",
          "排骨",
          "快递",
          "餐桌",
          "亲戚手机",
          "视频镜头",
          "饭盒"
        ],
        "contentVersion": "family-care.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "family-care.q.relative.warm": {
        "id": "family-care.q.relative.warm",
        "routeId": "family-care",
        "sourceRefs": [
          "FAM-04"
        ],
        "options": [
          {
            "id": "family-care.q.relative.warm.option.details",
            "label": "你先把基本情况发我，我自己决定要不要聊。",
            "intent": "normal",
            "stateTags": [
              "warm"
            ],
            "sourceRefs": [
              "FAM-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "你先把基本情况发我，我自己决定要不要聊。",
            "consequence": {
              "id": "family-care.c.relative.warm.details",
              "action": "奶蛙只记下三条公开信息，不碰对方微信",
              "npcReaction": "姑姑收回手机，说回头先问本人",
              "visibleStateChange": "奶蛙只记下三条公开信息，不碰对方微信 姑姑收回手机，说回头先问本人",
              "nextNodeId": "family-care.q.video.warm"
            }
          },
          {
            "id": "family-care.q.relative.warm.option.decline",
            "label": "谢谢你想着我，但我现在不想认识人。",
            "intent": "boundary",
            "stateTags": [
              "boundary"
            ],
            "sourceRefs": [
              "FAM-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "谢谢你想着我，但我现在不想认识人。",
            "consequence": {
              "id": "family-care.c.relative.warm.decline",
              "action": "奶蛙把手机轻推回姑姑手边，屏幕仍锁着",
              "npcReaction": "姑姑有点可惜，妈妈帮着说“那就不加”",
              "visibleStateChange": "奶蛙把手机轻推回姑姑手边，屏幕仍锁着 姑姑有点可惜，妈妈帮着说“那就不加”",
              "nextNodeId": "family-care.q.video.boundary"
            }
          },
          {
            "id": "family-care.q.relative.warm.option.consent",
            "label": "先问对方知不知道。双方都愿意，再交换联系方式。",
            "intent": "strategy",
            "stateTags": [
              "strategy"
            ],
            "sourceRefs": [
              "FAM-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "先问对方知不知道。双方都愿意，再交换联系方式。",
            "consequence": {
              "id": "family-care.c.relative.warm.consent",
              "action": "奶蛙在两张空白联系人卡中间放“双方确认”",
              "npcReaction": "姑姑当场没加人，只说晚点去问",
              "visibleStateChange": "奶蛙在两张空白联系人卡中间放“双方确认” 姑姑当场没加人，只说晚点去问",
              "nextNodeId": "family-care.q.video.warm"
            }
          },
          {
            "id": "family-care.q.relative.warm.option.checkbox",
            "label": "给介绍页加一栏：本人已知情 □。没勾不能翻页。",
            "intent": "absurd",
            "stateTags": [
              "absurd"
            ],
            "sourceRefs": [
              "FAM-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "给介绍页加一栏：本人已知情 □。没勾不能翻页。",
            "consequence": {
              "id": "family-care.c.relative.warm.checkbox",
              "action": "奶蛙用饭店点菜单夹住手机，空框巨大",
              "npcReaction": "姑姑笑着把手机扣下，说“这还真没问”",
              "visibleStateChange": "奶蛙用饭店点菜单夹住手机，空框巨大 姑姑笑着把手机扣下，说“这还真没问”",
              "nextNodeId": "family-care.q.video.boundary"
            }
          }
        ],
        "stage": 4,
        "prompt": "饭吃到一半，姑姑把手机推过来：“我同事家孩子，跟你差不多大。要不加个微信聊聊？”照片里的人显然还不知道自己上桌了。",
        "sceneObjects": [
          "家族群",
          "排骨",
          "快递",
          "餐桌",
          "亲戚手机",
          "视频镜头",
          "饭盒"
        ],
        "contentVersion": "family-care.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "family-care.q.relative.boundary": {
        "id": "family-care.q.relative.boundary",
        "routeId": "family-care",
        "sourceRefs": [
          "FAM-04"
        ],
        "options": [
          {
            "id": "family-care.q.relative.boundary.option.later",
            "label": "二维码先别扫。你把情况发我，我晚点自己看。",
            "intent": "normal",
            "stateTags": [
              "warm"
            ],
            "sourceRefs": [
              "FAM-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "二维码先别扫。你把情况发我，我晚点自己看。",
            "consequence": {
              "id": "family-care.c.relative.boundary.later",
              "action": "玩家确认后，奶蛙只收下一张文字便签",
              "npcReaction": "姑姑退出二维码，答应不代加",
              "visibleStateChange": "玩家确认后，奶蛙只收下一张文字便签 姑姑退出二维码，答应不代加",
              "nextNodeId": "family-care.q.video.warm"
            }
          },
          {
            "id": "family-care.q.relative.boundary.option.no",
            "label": "不加，朋友也得我自己想认识。",
            "intent": "boundary",
            "stateTags": [
              "boundary"
            ],
            "sourceRefs": [
              "FAM-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "不加，朋友也得我自己想认识。",
            "consequence": {
              "id": "family-care.c.relative.boundary.no",
              "action": "奶蛙把二维码遮光卡合上",
              "npcReaction": "姑姑叹口气，但把手机装回包里",
              "visibleStateChange": "奶蛙把二维码遮光卡合上 姑姑叹口气，但把手机装回包里",
              "nextNodeId": "family-care.q.video.boundary"
            }
          },
          {
            "id": "family-care.q.relative.boundary.option.ask-first",
            "label": "你先问他愿不愿意，别把两个人都架上去。",
            "intent": "strategy",
            "stateTags": [
              "strategy"
            ],
            "sourceRefs": [
              "FAM-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "你先问他愿不愿意，别把两个人都架上去。",
            "consequence": {
              "id": "family-care.c.relative.boundary.ask-first",
              "action": "奶蛙在桌上摆两把小椅子，两边都空着",
              "npcReaction": "爸爸说“这个说得对”",
              "visibleStateChange": "奶蛙在桌上摆两把小椅子，两边都空着 爸爸说“这个说得对”",
              "nextNodeId": "family-care.q.video.warm"
            }
          },
          {
            "id": "family-care.q.relative.boundary.option.queue",
            "label": "让奶蛙发一张取号单：介绍人先去征得双方同意。",
            "intent": "absurd",
            "stateTags": [
              "absurd"
            ],
            "sourceRefs": [
              "FAM-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "让奶蛙发一张取号单：介绍人先去征得双方同意。",
            "consequence": {
              "id": "family-care.c.relative.boundary.queue",
              "action": "小票机吐出“当前等待：2 位当事人”",
              "npcReaction": "姑姑把小票拍进家族群，没再推二维码",
              "visibleStateChange": "小票机吐出“当前等待：2 位当事人” 姑姑把小票拍进家族群，没再推二维码",
              "nextNodeId": "family-care.q.video.boundary"
            }
          }
        ],
        "stage": 4,
        "prompt": "你刚把工作话题关掉，姑姑换了个更轻的说法：“不相亲，就当认识个朋友？”手机已经停在加好友二维码页。",
        "sceneObjects": [
          "家族群",
          "排骨",
          "快递",
          "餐桌",
          "亲戚手机",
          "视频镜头",
          "饭盒"
        ],
        "contentVersion": "family-care.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "family-care.q.relative.strategy": {
        "id": "family-care.q.relative.strategy",
        "routeId": "family-care",
        "sourceRefs": [
          "FAM-04"
        ],
        "options": [
          {
            "id": "family-care.q.relative.strategy.option.kind",
            "label": "就说你问过了，我暂时没这个打算。谢谢人家。",
            "intent": "normal",
            "stateTags": [
              "warm"
            ],
            "sourceRefs": [
              "FAM-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "就说你问过了，我暂时没这个打算。谢谢人家。",
            "consequence": {
              "id": "family-care.c.relative.strategy.kind",
              "action": "奶蛙写下一句短回复，末尾没有替你承诺",
              "npcReaction": "姑姑照着念一遍，觉得能交代",
              "visibleStateChange": "奶蛙写下一句短回复，末尾没有替你承诺 姑姑照着念一遍，觉得能交代",
              "nextNodeId": "family-care.q.video.warm"
            }
          },
          {
            "id": "family-care.q.relative.strategy.option.not-middle",
            "label": "以后别先替我接，你也不用夹在中间。",
            "intent": "boundary",
            "stateTags": [
              "boundary"
            ],
            "sourceRefs": [
              "FAM-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "以后别先替我接，你也不用夹在中间。",
            "consequence": {
              "id": "family-care.c.relative.strategy.not-middle",
              "action": "奶蛙从两部手机中间移走姑姑的姓名牌",
              "npcReaction": "姑姑说“那我以后先问你”",
              "visibleStateChange": "奶蛙从两部手机中间移走姑姑的姓名牌 姑姑说“那我以后先问你”",
              "nextNodeId": "family-care.q.video.boundary"
            }
          },
          {
            "id": "family-care.q.relative.strategy.option.template",
            "label": "统一回：双方本人同意后再交换信息。",
            "intent": "strategy",
            "stateTags": [
              "strategy"
            ],
            "sourceRefs": [
              "FAM-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "统一回：双方本人同意后再交换信息。",
            "consequence": {
              "id": "family-care.c.relative.strategy.template",
              "action": "奶蛙做成一张只有一行的家族群便签",
              "npcReaction": "妈妈也保存了这句，表示以后照用",
              "visibleStateChange": "奶蛙做成一张只有一行的家族群便签 妈妈也保存了这句，表示以后照用",
              "nextNodeId": "family-care.q.video.warm"
            }
          },
          {
            "id": "family-care.q.relative.strategy.option.stamp",
            "label": "送姑一个“未经本人同意”作废章，谁托她就盖谁。",
            "intent": "absurd",
            "stateTags": [
              "absurd"
            ],
            "sourceRefs": [
              "FAM-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "送姑一个“未经本人同意”作废章，谁托她就盖谁。",
            "consequence": {
              "id": "family-care.c.relative.strategy.stamp",
              "action": "奶蛙在空白纸上盖出一个巨大斜章",
              "npcReaction": "姑姑拿着章给同事拍照，先问你能不能发",
              "visibleStateChange": "奶蛙在空白纸上盖出一个巨大斜章 姑姑拿着章给同事拍照，先问你能不能发",
              "nextNodeId": "family-care.q.video.boundary"
            }
          }
        ],
        "stage": 4,
        "prompt": "轮到姑姑回答同类问题时，她坦白最近总被同事托着介绍对象，怕两边都得罪。她问你：“那我怎么回人家合适？”",
        "sceneObjects": [
          "家族群",
          "排骨",
          "快递",
          "餐桌",
          "亲戚手机",
          "视频镜头",
          "饭盒"
        ],
        "contentVersion": "family-care.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "family-care.q.relative.absurd": {
        "id": "family-care.q.relative.absurd",
        "routeId": "family-care",
        "sourceRefs": [
          "FAM-04"
        ],
        "options": [
          {
            "id": "family-care.q.relative.absurd.option.keep-summary",
            "label": "资料你收回，只跟我说两句基本情况就行。",
            "intent": "normal",
            "stateTags": [
              "warm"
            ],
            "sourceRefs": [
              "FAM-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "资料你收回，只跟我说两句基本情况就行。",
            "consequence": {
              "id": "family-care.c.relative.absurd.keep-summary",
              "action": "奶蛙把纸面朝下，只留下两张口述便签",
              "npcReaction": "姑姑收起详细资料，答应先去问",
              "visibleStateChange": "奶蛙把纸面朝下，只留下两张口述便签 姑姑收起详细资料，答应先去问",
              "nextNodeId": "family-care.q.video.warm"
            }
          },
          {
            "id": "family-care.q.relative.absurd.option.shred",
            "label": "这份别给我看，也别再转给别人。",
            "intent": "boundary",
            "stateTags": [
              "boundary"
            ],
            "sourceRefs": [
              "FAM-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "这份别给我看，也别再转给别人。",
            "consequence": {
              "id": "family-care.c.relative.absurd.shred",
              "action": "奶蛙把资料装回不透明文件袋，封口交还",
              "npcReaction": "姑姑意识到信息太多，点头收好",
              "visibleStateChange": "奶蛙把资料装回不透明文件袋，封口交还 姑姑意识到信息太多，点头收好",
              "nextNodeId": "family-care.q.video.boundary"
            }
          },
          {
            "id": "family-care.q.relative.absurd.option.redact",
            "label": "先隐去单位和联系方式，问到双方同意再继续。",
            "intent": "strategy",
            "stateTags": [
              "strategy"
            ],
            "sourceRefs": [
              "FAM-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "先隐去单位和联系方式，问到双方同意再继续。",
            "consequence": {
              "id": "family-care.c.relative.absurd.redact",
              "action": "奶蛙用纸条盖住识别信息，不保存副本",
              "npcReaction": "姑姑说以后只转本人同意的简介",
              "visibleStateChange": "奶蛙用纸条盖住识别信息，不保存副本 姑姑说以后只转本人同意的简介",
              "nextNodeId": "family-care.q.video.warm"
            }
          },
          {
            "id": "family-care.q.relative.absurd.option.exhibit-rule",
            "label": "把它放进养生展反面教材区：材料齐了，当事人没来。",
            "intent": "absurd",
            "stateTags": [
              "absurd"
            ],
            "sourceRefs": [
              "FAM-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "把它放进养生展反面教材区：材料齐了，当事人没来。",
            "consequence": {
              "id": "family-care.c.relative.absurd.exhibit-rule",
              "action": "文件袋进入“缺关键部件”展台，姓名仍被遮住",
              "npcReaction": "全桌笑完后，姑姑主动撤展",
              "visibleStateChange": "文件袋进入“缺关键部件”展台，姓名仍被遮住 全桌笑完后，姑姑主动撤展",
              "nextNodeId": "family-care.q.video.boundary"
            }
          }
        ],
        "stage": 4,
        "prompt": "亲戚问题菜单翻到最后一页，姑姑真的拿出一张“候选人资料”。姓名、单位都有，唯独没有“本人知情”。",
        "sceneObjects": [
          "家族群",
          "排骨",
          "快递",
          "餐桌",
          "亲戚手机",
          "视频镜头",
          "饭盒"
        ],
        "contentVersion": "family-care.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "family-care.q.video.warm": {
        "id": "family-care.q.video.warm",
        "routeId": "family-care",
        "sourceRefs": [
          "FAM-01"
        ],
        "options": [
          {
            "id": "family-care.q.video.warm.option.face-boxes",
            "label": "接。镜头看我和饭盒，屋里别巡一圈。",
            "intent": "normal",
            "stateTags": [
              "warm"
            ],
            "sourceRefs": [
              "FAM-01"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "接。镜头看我和饭盒，屋里别巡一圈。",
            "consequence": {
              "id": "family-care.c.video.warm.face-boxes",
              "action": "玩家确认后视频接通，奶蛙给镜头画出人和饭盒两个框",
              "npcReaction": "妈妈看见人平安、菜入冰箱就放心挂断",
              "visibleStateChange": "玩家确认后视频接通，奶蛙给镜头画出人和饭盒两个框 妈妈看见人平安、菜入冰箱就放心挂断",
              "nextNodeId": "family-care.q.boxes.warm"
            }
          },
          {
            "id": "family-care.q.video.warm.option.photo",
            "label": "今天不视频，我发一张晚饭和到家消息。",
            "intent": "boundary",
            "stateTags": [
              "boundary"
            ],
            "sourceRefs": [
              "FAM-01"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "今天不视频，我发一张晚饭和到家消息。",
            "consequence": {
              "id": "family-care.c.video.warm.photo",
              "action": "玩家确认后只发送饭盒与时钟同框照",
              "npcReaction": "妈妈回“到了就行”，没有继续拨",
              "visibleStateChange": "玩家确认后只发送饭盒与时钟同框照 妈妈回“到了就行”，没有继续拨",
              "nextNodeId": "family-care.q.boxes.boundary"
            }
          },
          {
            "id": "family-care.q.video.warm.option.schedule",
            "label": "改到周三八点，十分钟。到时一起看那箱东西怎么处理。",
            "intent": "strategy",
            "stateTags": [
              "strategy"
            ],
            "sourceRefs": [
              "FAM-01"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "改到周三八点，十分钟。到时一起看那箱东西怎么处理。",
            "consequence": {
              "id": "family-care.c.video.warm.schedule",
              "action": "奶蛙创建十分钟家庭通话日程，写明两个议题",
              "npcReaction": "妈妈接受预约，把订单截图先发来",
              "visibleStateChange": "奶蛙创建十分钟家庭通话日程，写明两个议题 妈妈接受预约，把订单截图先发来",
              "nextNodeId": "family-care.q.boxes.warm"
            }
          },
          {
            "id": "family-care.q.video.warm.option.tour-line",
            "label": "接，但奶蛙先贴一条“冰箱参观线”，镜头越线罚一盒菜。",
            "intent": "absurd",
            "stateTags": [
              "absurd"
            ],
            "sourceRefs": [
              "FAM-01"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "接，但奶蛙先贴一条“冰箱参观线”，镜头越线罚一盒菜。",
            "consequence": {
              "id": "family-care.c.video.warm.tour-line",
              "action": "镜头前出现黄黑胶带，刚好圈住冰箱和玩家",
              "npcReaction": "妈妈笑着只检查线内，没要求看卧室",
              "visibleStateChange": "镜头前出现黄黑胶带，刚好圈住冰箱和玩家 妈妈笑着只检查线内，没要求看卧室",
              "nextNodeId": "family-care.q.boxes.boundary"
            }
          }
        ],
        "stage": 5,
        "prompt": "你回到住处，妈妈发来视频邀请：“到家了没？让我看看你脸色，再看看饭盒放冰箱没。”你看见目标后再决定。",
        "sceneObjects": [
          "家族群",
          "排骨",
          "快递",
          "餐桌",
          "亲戚手机",
          "视频镜头",
          "饭盒"
        ],
        "contentVersion": "family-care.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "family-care.q.video.boundary": {
        "id": "family-care.q.video.boundary",
        "routeId": "family-care",
        "sourceRefs": [
          "FAM-01"
        ],
        "options": [
          {
            "id": "family-care.q.video.boundary.option.accept",
            "label": "方便，五分钟。你看我今天吃的，别查全屋。",
            "intent": "normal",
            "stateTags": [
              "warm"
            ],
            "sourceRefs": [
              "FAM-01"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "方便，五分钟。你看我今天吃的，别查全屋。",
            "consequence": {
              "id": "family-care.c.video.boundary.accept",
              "action": "奶蛙启动五分钟计时，镜头固定餐桌",
              "npcReaction": "妈妈看到热饭后语气放松",
              "visibleStateChange": "奶蛙启动五分钟计时，镜头固定餐桌 妈妈看到热饭后语气放松",
              "nextNodeId": "family-care.q.boxes.warm"
            }
          },
          {
            "id": "family-care.q.video.boundary.option.no-camera",
            "label": "不方便开镜头。我吃了，晚点给你发消息。",
            "intent": "boundary",
            "stateTags": [
              "boundary"
            ],
            "sourceRefs": [
              "FAM-01"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "不方便开镜头。我吃了，晚点给你发消息。",
            "consequence": {
              "id": "family-care.c.video.boundary.no-camera",
              "action": "视频按钮保持未接，玩家确认发送一条文字",
              "npcReaction": "妈妈回一个“好”，没有追拨",
              "visibleStateChange": "视频按钮保持未接，玩家确认发送一条文字 妈妈回一个“好”，没有追拨",
              "nextNodeId": "family-care.q.boxes.boundary"
            }
          },
          {
            "id": "family-care.q.video.boundary.option.menu-photo",
            "label": "我发今天的饭；你也把你们晚饭拍来，互相检查。",
            "intent": "strategy",
            "stateTags": [
              "strategy"
            ],
            "sourceRefs": [
              "FAM-01"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "我发今天的饭；你也把你们晚饭拍来，互相检查。",
            "consequence": {
              "id": "family-care.c.video.boundary.menu-photo",
              "action": "聊天框出现两张平等大小的晚饭占位卡",
              "npcReaction": "爸爸拍来一盘青菜，关心变成双向",
              "visibleStateChange": "聊天框出现两张平等大小的晚饭占位卡 爸爸拍来一盘青菜，关心变成双向",
              "nextNodeId": "family-care.q.boxes.warm"
            }
          },
          {
            "id": "family-care.q.video.boundary.option.museum",
            "label": "开视频。奶蛙只开放“今晚吃了什么”展区，别的闭馆。",
            "intent": "absurd",
            "stateTags": [
              "absurd"
            ],
            "sourceRefs": [
              "FAM-01"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "开视频。奶蛙只开放“今晚吃了什么”展区，别的闭馆。",
            "consequence": {
              "id": "family-care.c.video.boundary.museum",
              "action": "餐桌被三根小围栏围住，卧室方向挂闭馆牌",
              "npcReaction": "妈妈配合看完展品就挂了",
              "visibleStateChange": "餐桌被三根小围栏围住，卧室方向挂闭馆牌 妈妈配合看完展品就挂了",
              "nextNodeId": "family-care.q.boxes.boundary"
            }
          }
        ],
        "stage": 5,
        "prompt": "前面的边界有没有被听见还不确定。妈妈没直接拨，只发：“方便视频吗？我想看你是不是又只吃面包。”",
        "sceneObjects": [
          "家族群",
          "排骨",
          "快递",
          "餐桌",
          "亲戚手机",
          "视频镜头",
          "饭盒"
        ],
        "contentVersion": "family-care.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "family-care.q.boxes.warm": {
        "id": "family-care.q.boxes.warm",
        "routeId": "family-care",
        "sourceRefs": [
          "FAM-02",
          "FAM-03",
          "FAM-05",
          "FAM-06"
        ],
        "options": [
          {
            "id": "family-care.q.boxes.warm.option.keep-all",
            "label": "都留，吃完我洗好，下周把盒子带回去。",
            "intent": "normal",
            "stateTags": [
              "warm"
            ],
            "sourceRefs": [
              "FAM-02",
              "FAM-03",
              "FAM-05",
              "FAM-06"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "都留，吃完我洗好，下周把盒子带回去。",
            "consequence": {
              "id": "family-care.c.boxes.warm.keep-all",
              "action": "奶蛙按食用顺序排好七盒，并建空盒返还提醒",
              "npcReaction": "妈妈终于放心，嘱咐先吃青菜",
              "visibleStateChange": "奶蛙按食用顺序排好七盒，并建空盒返还提醒 妈妈终于放心，嘱咐先吃青菜",
              "nextNodeId": "result"
            }
          },
          {
            "id": "family-care.q.boxes.warm.option.keep-two",
            "label": "我留两盒，其他你们也吃，别把一周饭都压给我。",
            "intent": "strategy",
            "stateTags": [
              "boundary"
            ],
            "sourceRefs": [
              "FAM-02",
              "FAM-03",
              "FAM-05",
              "FAM-06"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "我留两盒，其他你们也吃，别把一周饭都压给我。",
            "consequence": {
              "id": "family-care.c.boxes.warm.keep-two",
              "action": "奶蛙选出两盒，其余放回家中那层冰箱",
              "npcReaction": "爸爸拿回汤，承认自己也爱喝",
              "visibleStateChange": "奶蛙选出两盒，其余放回家中那层冰箱 爸爸拿回汤，承认自己也爱喝",
              "nextNodeId": "result"
            }
          },
          {
            "id": "family-care.q.boxes.warm.option.label",
            "label": "先贴日期和先后，吃不完的今晚分掉。",
            "intent": "boundary",
            "stateTags": [
              "strategy"
            ],
            "sourceRefs": [
              "FAM-02",
              "FAM-03",
              "FAM-05",
              "FAM-06"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "先贴日期和先后，吃不完的今晚分掉。",
            "consequence": {
              "id": "family-care.c.boxes.warm.label",
              "action": "奶蛙贴上冷藏顺序，家庭成员各领走一盒",
              "npcReaction": "妈妈发现不用全塞给你也不会浪费",
              "visibleStateChange": "奶蛙贴上冷藏顺序，家庭成员各领走一盒 妈妈发现不用全塞给你也不会浪费",
              "nextNodeId": "result"
            }
          },
          {
            "id": "family-care.q.boxes.warm.option.garlic",
            "label": "两瓣蒜那盒封为“家庭关心最小单位”，谁都不许加菜。",
            "intent": "absurd",
            "stateTags": [
              "absurd"
            ],
            "sourceRefs": [
              "FAM-02",
              "FAM-03",
              "FAM-05",
              "FAM-06"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "两瓣蒜那盒封为“家庭关心最小单位”，谁都不许加菜。",
            "consequence": {
              "id": "family-care.c.boxes.warm.garlic",
              "action": "最小饭盒被单独摆在冰箱正中，其他六盒围成一圈",
              "npcReaction": "全家笑完，终于同意下次少装一盒",
              "visibleStateChange": "最小饭盒被单独摆在冰箱正中，其他六盒围成一圈 全家笑完，终于同意下次少装一盒",
              "nextNodeId": "result"
            }
          }
        ],
        "stage": 6,
        "prompt": "镜头里，七个饭盒已经塞满冰箱：排骨、青菜、汤，甚至有一盒只装了两瓣蒜。妈妈问：“都留着吧？”最后怎么收？",
        "sceneObjects": [
          "家族群",
          "排骨",
          "快递",
          "餐桌",
          "亲戚手机",
          "视频镜头",
          "饭盒"
        ],
        "contentVersion": "family-care.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "family-care.q.boxes.boundary": {
        "id": "family-care.q.boxes.boundary",
        "routeId": "family-care",
        "sourceRefs": [
          "FAM-02",
          "FAM-03",
          "FAM-05",
          "FAM-06"
        ],
        "options": [
          {
            "id": "family-care.q.boxes.boundary.option.ask",
            "label": "我问清是谁装的，能吃的留，心意我记着。",
            "intent": "normal",
            "stateTags": [
              "warm"
            ],
            "sourceRefs": [
              "FAM-02",
              "FAM-03",
              "FAM-05",
              "FAM-06"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "我问清是谁装的，能吃的留，心意我记着。",
            "consequence": {
              "id": "family-care.c.boxes.boundary.ask",
              "action": "奶蛙在群里逐袋发照片，等本人认领",
              "npcReaction": "姑姑认了两袋，外婆认了一袋",
              "visibleStateChange": "奶蛙在群里逐袋发照片，等本人认领 姑姑认了两袋，外婆认了一袋",
              "nextNodeId": "result"
            }
          },
          {
            "id": "family-care.q.boxes.boundary.option.leave",
            "label": "说了两盒就是两盒，匿名袋留家里大家吃。",
            "intent": "boundary",
            "stateTags": [
              "boundary"
            ],
            "sourceRefs": [
              "FAM-02",
              "FAM-03",
              "FAM-05",
              "FAM-06"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "说了两盒就是两盒，匿名袋留家里大家吃。",
            "consequence": {
              "id": "family-care.c.boxes.boundary.leave",
              "action": "奶蛙把三个袋子放回餐桌，不带出门",
              "npcReaction": "妈妈看你认真，没再往车里塞",
              "visibleStateChange": "奶蛙把三个袋子放回餐桌，不带出门 妈妈看你认真，没再往车里塞",
              "nextNodeId": "result"
            }
          },
          {
            "id": "family-care.q.boxes.boundary.option.divide",
            "label": "现场拆开分，谁家今晚缺菜谁拿。",
            "intent": "strategy",
            "stateTags": [
              "strategy"
            ],
            "sourceRefs": [
              "FAM-02",
              "FAM-03",
              "FAM-05",
              "FAM-06"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "现场拆开分，谁家今晚缺菜谁拿。",
            "consequence": {
              "id": "family-care.c.boxes.boundary.divide",
              "action": "三袋菜按家庭晚饭缺口重新分配",
              "npcReaction": "姑姑拿走一袋，爸爸留下汤",
              "visibleStateChange": "三袋菜按家庭晚饭缺口重新分配 姑姑拿走一袋，爸爸留下汤",
              "nextNodeId": "result"
            }
          },
          {
            "id": "family-care.q.boxes.boundary.option.lost-found",
            "label": "放“家庭失物招领”，24 小时没人认就归爸爸。",
            "intent": "absurd",
            "stateTags": [
              "absurd"
            ],
            "sourceRefs": [
              "FAM-02",
              "FAM-03",
              "FAM-05",
              "FAM-06"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "放“家庭失物招领”，24 小时没人认就归爸爸。",
            "consequence": {
              "id": "family-care.c.boxes.boundary.lost-found",
              "action": "奶蛙竖起失物招领牌，爸爸姓名被预填在兜底栏",
              "npcReaction": "三位长辈立刻抢着认领，匿名问题解决",
              "visibleStateChange": "奶蛙竖起失物招领牌，爸爸姓名被预填在兜底栏 三位长辈立刻抢着认领，匿名问题解决",
              "nextNodeId": "result"
            }
          }
        ],
        "stage": 6,
        "prompt": "饭桌上原本摆了七盒。你说只留两盒，临走时门边却多了五个没有署名的袋子。妈妈说：“不是我装的，你自己问。”",
        "sceneObjects": [
          "家族群",
          "排骨",
          "快递",
          "餐桌",
          "亲戚手机",
          "视频镜头",
          "饭盒"
        ],
        "contentVersion": "family-care.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      }
    },
    "canonicalPath": [
      "family-care.q.invite.option.lunch",
      "family-care.q.parcel.warm.option.accept-one",
      "family-care.q.dinner.warm.option.one-update",
      "family-care.q.relative.warm.option.details",
      "family-care.q.video.warm.option.face-boxes",
      "family-care.q.boxes.warm.option.keep-all"
    ]
  },
  "group-assignment": {
    "id": "group-assignment",
    "title": "作业到底是谁做的",
    "subtitle": "五个人的小组作业，文档里到底有几个活人",
    "contentVersion": "group-assignment.graph.preview.2026-07-22.v1",
    "startNodeId": "group-assignment.q.divide",
    "allowedSceneObjects": [
      "共享文档",
      "问卷",
      "修订记录",
      "在线 PPT",
      "课程系统",
      "答辩投影"
    ],
    "questions": {
      "group-assignment.q.divide": {
        "id": "group-assignment.q.divide",
        "routeId": "group-assignment",
        "sourceRefs": [
          "GRP-01",
          "GRP-04"
        ],
        "options": [
          {
            "id": "group-assignment.q.divide.option.framework",
            "label": "我先搭框架。大家报一下想做哪部分，今晚把人填上。",
            "intent": "normal",
            "stateTags": [
              "warm"
            ],
            "sourceRefs": [
              "GRP-01",
              "GRP-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "我先搭框架。大家报一下想做哪部分，今晚把人填上。",
            "consequence": {
              "id": "group-assignment.c.divide.framework",
              "action": "奶蛙搭出 15 页灰色占位，每页上方留负责人空格",
              "npcReaction": "两名同学马上认领，另两名说晚点看",
              "visibleStateChange": "奶蛙搭出 15 页灰色占位，每页上方留负责人空格 两名同学马上认领，另两名说晚点看",
              "nextNodeId": "group-assignment.q.data.warm"
            }
          },
          {
            "id": "group-assignment.q.divide.option.own-slice",
            "label": "我做第 3—5 页和图表，不默认包最后整合。",
            "intent": "boundary",
            "stateTags": [
              "boundary"
            ],
            "sourceRefs": [
              "GRP-01",
              "GRP-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "我做第 3—5 页和图表，不默认包最后整合。",
            "consequence": {
              "id": "group-assignment.c.divide.own-slice",
              "action": "奶蛙给 3—5 页围上清晰边框，整合栏仍空着",
              "npcReaction": "组员开始讨论谁来收总稿，而不是默认推给你",
              "visibleStateChange": "奶蛙给 3—5 页围上清晰边框，整合栏仍空着 组员开始讨论谁来收总稿，而不是默认推给你",
              "nextNodeId": "group-assignment.q.data.boundary"
            }
          },
          {
            "id": "group-assignment.q.divide.option.task-sheet",
            "label": "先开任务表：负责人、交付物、来源、最晚时间，自己选。",
            "intent": "strategy",
            "stateTags": [
              "strategy"
            ],
            "sourceRefs": [
              "GRP-01",
              "GRP-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "先开任务表：负责人、交付物、来源、最晚时间，自己选。",
            "consequence": {
              "id": "group-assignment.c.divide.task-sheet",
              "action": "共享文档多出四列表，五个名字逐个落位",
              "npcReaction": "有人把任务从“做数据”改成“找原始表＋写来源”",
              "visibleStateChange": "共享文档多出四列表，五个名字逐个落位 有人把任务从“做数据”改成“找原始表＋写来源”",
              "nextNodeId": "group-assignment.q.data.strategy"
            }
          },
          {
            "id": "group-assignment.q.divide.option.dare-column",
            "label": "再加一列：这句话你敢不敢在答辩时念？自己勾。",
            "intent": "absurd",
            "stateTags": [
              "absurd"
            ],
            "sourceRefs": [
              "GRP-01",
              "GRP-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "再加一列：这句话你敢不敢在答辩时念？自己勾。",
            "consequence": {
              "id": "group-assignment.c.divide.dare-column",
              "action": "任务表最右出现五个空复选框，奶蛙先把“网上搜的”那格标黄",
              "npcReaction": "群里有人发笑哭，但开始主动删空话",
              "visibleStateChange": "任务表最右出现五个空复选框，奶蛙先把“网上搜的”那格标黄 群里有人发笑哭，但开始主动删空话",
              "nextNodeId": "group-assignment.q.data.absurd"
            }
          }
        ],
        "stage": 1,
        "prompt": "老师在课程群里发：五人一组，15 页 PPT＋数据表，周日 23:59 截止；下周随机抽组员答辩。共享文档还是空的。你先说什么？",
        "sceneObjects": [
          "共享文档",
          "问卷",
          "修订记录",
          "在线 PPT",
          "课程系统",
          "答辩投影"
        ],
        "contentVersion": "group-assignment.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "group-assignment.q.data.warm": {
        "id": "group-assignment.q.data.warm",
        "routeId": "group-assignment",
        "sourceRefs": [
          "GRP-03",
          "GRP-04"
        ],
        "options": [
          {
            "id": "group-assignment.q.data.warm.option.ask-link",
            "label": "图先留着。原链接和口径发一下，我们一起核。",
            "intent": "normal",
            "stateTags": [
              "warm"
            ],
            "sourceRefs": [
              "GRP-03",
              "GRP-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "图先留着。原链接和口径发一下，我们一起核。",
            "consequence": {
              "id": "group-assignment.c.data.warm.ask-link",
              "action": "奶蛙保留图表但盖上“来源待补”，在旁边开核对栏",
              "npcReaction": "同学去翻浏览记录，承认只记得网站名",
              "visibleStateChange": "奶蛙保留图表但盖上“来源待补”，在旁边开核对栏 同学去翻浏览记录，承认只记得网站名",
              "nextNodeId": "group-assignment.q.history.warm"
            }
          },
          {
            "id": "group-assignment.q.data.warm.option.remove",
            "label": "没来源的数据先不进正文，我不会替它背书。",
            "intent": "boundary",
            "stateTags": [
              "boundary"
            ],
            "sourceRefs": [
              "GRP-03",
              "GRP-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "没来源的数据先不进正文，我不会替它背书。",
            "consequence": {
              "id": "group-assignment.c.data.warm.remove",
              "action": "63 行被移到隔离 Sheet，正文图表变灰",
              "npcReaction": "组员有点急，但同意先找可追溯数据",
              "visibleStateChange": "63 行被移到隔离 Sheet，正文图表变灰 组员有点急，但同意先找可追溯数据",
              "nextNodeId": "group-assignment.q.history.boundary"
            }
          },
          {
            "id": "group-assignment.q.data.warm.option.source-column",
            "label": "加三列：来源、抓取日期、指标定义；补不齐就换。",
            "intent": "strategy",
            "stateTags": [
              "strategy"
            ],
            "sourceRefs": [
              "GRP-03",
              "GRP-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "加三列：来源、抓取日期、指标定义；补不齐就换。",
            "consequence": {
              "id": "group-assignment.c.data.warm.source-column",
              "action": "表格右侧长出三列，空白处统一亮黄",
              "npcReaction": "两名组员分头找官网和原表",
              "visibleStateChange": "表格右侧长出三列，空白处统一亮黄 两名组员分头找官网和原表",
              "nextNodeId": "group-assignment.q.history.strategy"
            }
          },
          {
            "id": "group-assignment.q.data.warm.option.wild-sheet",
            "label": "先把它关进“野生数据观察区”，找到出处再放生。",
            "intent": "absurd",
            "stateTags": [
              "absurd"
            ],
            "sourceRefs": [
              "GRP-03",
              "GRP-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "先把它关进“野生数据观察区”，找到出处再放生。",
            "consequence": {
              "id": "group-assignment.c.data.warm.wild-sheet",
              "action": "奶蛙给隔离 Sheet 画小栅栏，图表戴上纸质脚环",
              "npcReaction": "群里笑完后，数据同学补了第一个真实链接",
              "visibleStateChange": "奶蛙给隔离 Sheet 画小栅栏，图表戴上纸质脚环 群里笑完后，数据同学补了第一个真实链接",
              "nextNodeId": "group-assignment.q.history.absurd"
            }
          }
        ],
        "stage": 2,
        "prompt": "框架刚搭好，负责数据的同学贴进 63 行数字，只写“网上找的，应该能用”。图表已经自动变得很好看。你怎么回？",
        "sceneObjects": [
          "共享文档",
          "问卷",
          "修订记录",
          "在线 PPT",
          "课程系统",
          "答辩投影"
        ],
        "contentVersion": "group-assignment.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "group-assignment.q.data.boundary": {
        "id": "group-assignment.q.data.boundary",
        "routeId": "group-assignment",
        "sourceRefs": [
          "GRP-03",
          "GRP-04"
        ],
        "options": [
          {
            "id": "group-assignment.q.data.boundary.option.one-question",
            "label": "我能画，但先告诉我数据从哪来、算的是什么。",
            "intent": "normal",
            "stateTags": [
              "warm"
            ],
            "sourceRefs": [
              "GRP-03",
              "GRP-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "我能画，但先告诉我数据从哪来、算的是什么。",
            "consequence": {
              "id": "group-assignment.c.data.boundary.one-question",
              "action": "奶蛙在图表入口摆两张问题卡，未回答前不生成",
              "npcReaction": "对方补充了指标意思，却仍找不到链接",
              "visibleStateChange": "奶蛙在图表入口摆两张问题卡，未回答前不生成 对方补充了指标意思，却仍找不到链接",
              "nextNodeId": "group-assignment.q.history.warm"
            }
          },
          {
            "id": "group-assignment.q.data.boundary.option.no-chart",
            "label": "来源补齐前我不出图，这部分退回给你。",
            "intent": "strategy",
            "stateTags": [
              "boundary"
            ],
            "sourceRefs": [
              "GRP-03",
              "GRP-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "来源补齐前我不出图，这部分退回给你。",
            "consequence": {
              "id": "group-assignment.c.data.boundary.no-chart",
              "action": "奶蛙把文件连同责任标签退回原负责人栏",
              "npcReaction": "对方开始找原始文件，没有把缺口转给你",
              "visibleStateChange": "奶蛙把文件连同责任标签退回原负责人栏 对方开始找原始文件，没有把缺口转给你",
              "nextNodeId": "group-assignment.q.history.boundary"
            }
          },
          {
            "id": "group-assignment.q.data.boundary.option.rebuild",
            "label": "给我原始数据或官网，我重算；只给结果表不行。",
            "intent": "boundary",
            "stateTags": [
              "strategy"
            ],
            "sourceRefs": [
              "GRP-03",
              "GRP-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "给我原始数据或官网，我重算；只给结果表不行。",
            "consequence": {
              "id": "group-assignment.c.data.boundary.rebuild",
              "action": "奶蛙把“结果表”与“原始表”画成两层，底层仍空",
              "npcReaction": "组员找到官网 CSV，图表可以重建",
              "visibleStateChange": "奶蛙把“结果表”与“原始表”画成两层，底层仍空 组员找到官网 CSV，图表可以重建",
              "nextNodeId": "group-assignment.q.history.strategy"
            }
          },
          {
            "id": "group-assignment.q.data.boundary.option.customs",
            "label": "数据先过海关：出处、口径、作者，缺一项不得入境。",
            "intent": "absurd",
            "stateTags": [
              "absurd"
            ],
            "sourceRefs": [
              "GRP-03",
              "GRP-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "数据先过海关：出处、口径、作者，缺一项不得入境。",
            "consequence": {
              "id": "group-assignment.c.data.boundary.customs",
              "action": "奶蛙在 Sheet 门口盖三枚章，当前只亮一枚",
              "npcReaction": "组员把“老师不一定问”撤回，开始补材料",
              "visibleStateChange": "奶蛙在 Sheet 门口盖三枚章，当前只亮一枚 组员把“老师不一定问”撤回，开始补材料",
              "nextNodeId": "group-assignment.q.history.absurd"
            }
          }
        ],
        "stage": 2,
        "prompt": "你负责的图表收到一张本地表格：文件名“数据最终版”，没有来源列。对方说：“你先画，老师不一定问。”",
        "sceneObjects": [
          "共享文档",
          "问卷",
          "修订记录",
          "在线 PPT",
          "课程系统",
          "答辩投影"
        ],
        "contentVersion": "group-assignment.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "group-assignment.q.data.strategy": {
        "id": "group-assignment.q.data.strategy",
        "routeId": "group-assignment",
        "sourceRefs": [
          "GRP-03",
          "GRP-04"
        ],
        "options": [
          {
            "id": "group-assignment.q.data.strategy.option.help-find",
            "label": "先别硬填。你说关键词，我跟你一起找原始出处。",
            "intent": "normal",
            "stateTags": [
              "warm"
            ],
            "sourceRefs": [
              "GRP-03",
              "GRP-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "先别硬填。你说关键词，我跟你一起找原始出处。",
            "consequence": {
              "id": "group-assignment.c.data.strategy.help-find",
              "action": "奶蛙把截图拆成关键词，两个人各开一个搜索格",
              "npcReaction": "负责人留下来一起找，不再只丢截图",
              "visibleStateChange": "奶蛙把截图拆成关键词，两个人各开一个搜索格 负责人留下来一起找，不再只丢截图",
              "nextNodeId": "group-assignment.q.history.warm"
            }
          },
          {
            "id": "group-assignment.q.data.strategy.option.mark-missing",
            "label": "这张不能用。我先把你这页标缺，不替你编数。",
            "intent": "boundary",
            "stateTags": [
              "boundary"
            ],
            "sourceRefs": [
              "GRP-03",
              "GRP-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "这张不能用。我先把你这页标缺，不替你编数。",
            "consequence": {
              "id": "group-assignment.c.data.strategy.mark-missing",
              "action": "对应页保留空图框，负责人和截止时间仍可见",
              "npcReaction": "全组看见真实缺口，没人能假装已完成",
              "visibleStateChange": "对应页保留空图框，负责人和截止时间仍可见 全组看见真实缺口，没人能假装已完成",
              "nextNodeId": "group-assignment.q.history.boundary"
            }
          },
          {
            "id": "group-assignment.q.data.strategy.option.switch-source",
            "label": "换公开数据集，题目缩一点，今晚还能重做。",
            "intent": "strategy",
            "stateTags": [
              "strategy"
            ],
            "sourceRefs": [
              "GRP-03",
              "GRP-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "换公开数据集，题目缩一点，今晚还能重做。",
            "consequence": {
              "id": "group-assignment.c.data.strategy.switch-source",
              "action": "奶蛙把研究问题收窄，任务表同步改口径",
              "npcReaction": "组员接受小范围但可验证的方案",
              "visibleStateChange": "奶蛙把研究问题收窄，任务表同步改口径 组员接受小范围但可验证的方案",
              "nextNodeId": "group-assignment.q.history.strategy"
            }
          },
          {
            "id": "group-assignment.q.data.strategy.option.screenshot-defense",
            "label": "截图可以留，但放附录，标题叫“我们差点信了什么”。",
            "intent": "absurd",
            "stateTags": [
              "absurd"
            ],
            "sourceRefs": [
              "GRP-03",
              "GRP-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "截图可以留，但放附录，标题叫“我们差点信了什么”。",
            "consequence": {
              "id": "group-assignment.c.data.strategy.screenshot-defense",
              "action": "截图进入反例页，旁边列出三个缺失信息",
              "npcReaction": "负责人主动补上查找过程，反例不再伪装证据",
              "visibleStateChange": "截图进入反例页，旁边列出三个缺失信息 负责人主动补上查找过程，反例不再伪装证据",
              "nextNodeId": "group-assignment.q.history.absurd"
            }
          }
        ],
        "stage": 2,
        "prompt": "任务表显示数据负责人已超时两小时。他终于发来一张公众号截图，没有原表，备注是“数字差不多就这些”。",
        "sceneObjects": [
          "共享文档",
          "问卷",
          "修订记录",
          "在线 PPT",
          "课程系统",
          "答辩投影"
        ],
        "contentVersion": "group-assignment.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "group-assignment.q.data.absurd": {
        "id": "group-assignment.q.data.absurd",
        "routeId": "group-assignment",
        "sourceRefs": [
          "GRP-03",
          "GRP-04"
        ],
        "options": [
          {
            "id": "group-assignment.q.data.absurd.option.explain",
            "label": "AI 可以帮找线索，但这行得换成能点开的原始来源。",
            "intent": "normal",
            "stateTags": [
              "warm"
            ],
            "sourceRefs": [
              "GRP-03",
              "GRP-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "AI 可以帮找线索，但这行得换成能点开的原始来源。",
            "consequence": {
              "id": "group-assignment.c.data.absurd.explain",
              "action": "奶蛙把“AI 说的”箭头改指向“待找原始来源”",
              "npcReaction": "同学明白不是禁用工具，而是结论要核",
              "visibleStateChange": "奶蛙把“AI 说的”箭头改指向“待找原始来源” 同学明白不是禁用工具，而是结论要核",
              "nextNodeId": "group-assignment.q.history.warm"
            }
          },
          {
            "id": "group-assignment.q.data.absurd.option.delete",
            "label": "找不到出处就删，问十遍也不算来源。",
            "intent": "strategy",
            "stateTags": [
              "boundary"
            ],
            "sourceRefs": [
              "GRP-03",
              "GRP-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "找不到出处就删，问十遍也不算来源。",
            "consequence": {
              "id": "group-assignment.c.data.absurd.delete",
              "action": "红行从正文撤下，引用编号自动回收",
              "npcReaction": "同学没再坚持，把精力转去找可用数据",
              "visibleStateChange": "红行从正文撤下，引用编号自动回收 同学没再坚持，把精力转去找可用数据",
              "nextNodeId": "group-assignment.q.history.boundary"
            }
          },
          {
            "id": "group-assignment.q.data.absurd.option.verify-pack",
            "label": "把提示词、候选链接和核验结果放一起，最后只引用原站。",
            "intent": "boundary",
            "stateTags": [
              "strategy"
            ],
            "sourceRefs": [
              "GRP-03",
              "GRP-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "把提示词、候选链接和核验结果放一起，最后只引用原站。",
            "consequence": {
              "id": "group-assignment.c.data.absurd.verify-pack",
              "action": "奶蛙建立线索—原站—核验三段链，正文只接原站",
              "npcReaction": "组员能看出哪一步是 AI 辅助、哪一步是本人负责",
              "visibleStateChange": "奶蛙建立线索—原站—核验三段链，正文只接原站 组员能看出哪一步是 AI 辅助、哪一步是本人负责",
              "nextNodeId": "group-assignment.q.history.strategy"
            }
          },
          {
            "id": "group-assignment.q.data.absurd.option.witness",
            "label": "给 AI 留个空椅子，随机答辩抽到它时谁负责翻译？",
            "intent": "absurd",
            "stateTags": [
              "absurd"
            ],
            "sourceRefs": [
              "GRP-03",
              "GRP-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "给 AI 留个空椅子，随机答辩抽到它时谁负责翻译？",
            "consequence": {
              "id": "group-assignment.c.data.absurd.witness",
              "action": "奶蛙在五人座位旁摆第六张空椅，椅背写“无法到场”",
              "npcReaction": "全组笑完一致删掉不可解释的数据",
              "visibleStateChange": "奶蛙在五人座位旁摆第六张空椅，椅背写“无法到场” 全组笑完一致删掉不可解释的数据",
              "nextNodeId": "group-assignment.q.history.absurd"
            }
          }
        ],
        "stage": 2,
        "prompt": "“敢不敢念”列把四行标红，其中一行数据来源真的写着“AI 说的”。那位同学补充：“我问了两遍，一样的。”",
        "sceneObjects": [
          "共享文档",
          "问卷",
          "修订记录",
          "在线 PPT",
          "课程系统",
          "答辩投影"
        ],
        "contentVersion": "group-assignment.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "group-assignment.q.history.warm": {
        "id": "group-assignment.q.history.warm",
        "routeId": "group-assignment",
        "sourceRefs": [
          "GRP-02",
          "GRP-04"
        ],
        "options": [
          {
            "id": "group-assignment.q.history.warm.option.check-in",
            "label": "现在还缺三块。大家报一下卡在哪，能换小任务。",
            "intent": "normal",
            "stateTags": [
              "warm"
            ],
            "sourceRefs": [
              "GRP-02",
              "GRP-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "现在还缺三块。大家报一下卡在哪，能换小任务。",
            "consequence": {
              "id": "group-assignment.c.history.warm.check-in",
              "action": "奶蛙把三个空页各拆成一项二十分钟的小任务",
              "npcReaction": "一人承认不会做图，改领参考文献核对",
              "visibleStateChange": "奶蛙把三个空页各拆成一项二十分钟的小任务 一人承认不会做图，改领参考文献核对",
              "nextNodeId": "group-assignment.q.final.warm"
            }
          },
          {
            "id": "group-assignment.q.history.warm.option.only-delivered",
            "label": "今晚十点后，我只整合已经交的内容。",
            "intent": "boundary",
            "stateTags": [
              "boundary"
            ],
            "sourceRefs": [
              "GRP-02",
              "GRP-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "今晚十点后，我只整合已经交的内容。",
            "consequence": {
              "id": "group-assignment.c.history.warm.only-delivered",
              "action": "奶蛙在修订时间线上插入 22:00 冻结旗",
              "npcReaction": "组员看见明确边界，开始真实提交而不是只回收到",
              "visibleStateChange": "奶蛙在修订时间线上插入 22:00 冻结旗 组员看见明确边界，开始真实提交而不是只回收到",
              "nextNodeId": "group-assignment.q.final.boundary"
            }
          },
          {
            "id": "group-assignment.q.history.warm.option.gap-list",
            "label": "按修订记录列缺口，不算字数，只看交付物有没有。",
            "intent": "strategy",
            "stateTags": [
              "strategy"
            ],
            "sourceRefs": [
              "GRP-02",
              "GRP-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "按修订记录列缺口，不算字数，只看交付物有没有。",
            "consequence": {
              "id": "group-assignment.c.history.warm.gap-list",
              "action": "奶蛙生成五人交付清单：框架、数据、图、文、口播",
              "npcReaction": "全组能看到脏活和内容都在表里",
              "visibleStateChange": "奶蛙生成五人交付清单：框架、数据、图、文、口播 全组能看到脏活和内容都在表里",
              "nextNodeId": "group-assignment.q.final.strategy"
            }
          },
          {
            "id": "group-assignment.q.history.warm.option.received-test",
            "label": "以后回“收到”前，先说出文件里一个错字。",
            "intent": "absurd",
            "stateTags": [
              "absurd"
            ],
            "sourceRefs": [
              "GRP-02",
              "GRP-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "以后回“收到”前，先说出文件里一个错字。",
            "consequence": {
              "id": "group-assignment.c.history.warm.received-test",
              "action": "奶蛙把“收到”按钮改成一格文件阅读小测",
              "npcReaction": "三个收到里终于有人指出图例写反了",
              "visibleStateChange": "奶蛙把“收到”按钮改成一格文件阅读小测 三个收到里终于有人指出图例写反了",
              "nextNodeId": "group-assignment.q.final.absurd"
            }
          }
        ],
        "stage": 3,
        "prompt": "数据终于能追溯。共享文档的修订记录却显示，今晚只有你和另一位同学真正改过正文；其余三人都在群里回了“收到”。你怎么处理？",
        "sceneObjects": [
          "共享文档",
          "问卷",
          "修订记录",
          "在线 PPT",
          "课程系统",
          "答辩投影"
        ],
        "contentVersion": "group-assignment.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "group-assignment.q.history.boundary": {
        "id": "group-assignment.q.history.boundary",
        "routeId": "group-assignment",
        "sourceRefs": [
          "GRP-02",
          "GRP-04"
        ],
        "options": [
          {
            "id": "group-assignment.q.history.boundary.option.ask-why",
            "label": "我先还原副本。你具体想改哪儿，我们对着说。",
            "intent": "normal",
            "stateTags": [
              "warm"
            ],
            "sourceRefs": [
              "GRP-02",
              "GRP-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "我先还原副本。你具体想改哪儿，我们对着说。",
            "consequence": {
              "id": "group-assignment.c.history.boundary.ask-why",
              "action": "奶蛙从历史记录生成副本，左右对照两版",
              "npcReaction": "对方说清只是字体问题，不再整段覆盖",
              "visibleStateChange": "奶蛙从历史记录生成副本，左右对照两版 对方说清只是字体问题，不再整段覆盖",
              "nextNodeId": "group-assignment.q.final.warm"
            }
          },
          {
            "id": "group-assignment.q.history.boundary.option.restore",
            "label": "内容先恢复。没跟负责人说过，不要整页替换。",
            "intent": "boundary",
            "stateTags": [
              "boundary"
            ],
            "sourceRefs": [
              "GRP-02",
              "GRP-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "内容先恢复。没跟负责人说过，不要整页替换。",
            "consequence": {
              "id": "group-assignment.c.history.boundary.restore",
              "action": "玩家确认后恢复原内容，保留对方版本作比较",
              "npcReaction": "对方接受先评论再改的规则",
              "visibleStateChange": "玩家确认后恢复原内容，保留对方版本作比较 对方接受先评论再改的规则",
              "nextNodeId": "group-assignment.q.final.boundary"
            }
          },
          {
            "id": "group-assignment.q.history.boundary.option.review-mode",
            "label": "正文锁定，后续都走批注；负责人确认后再合并。",
            "intent": "strategy",
            "stateTags": [
              "strategy"
            ],
            "sourceRefs": [
              "GRP-02",
              "GRP-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "正文锁定，后续都走批注；负责人确认后再合并。",
            "consequence": {
              "id": "group-assignment.c.history.boundary.review-mode",
              "action": "奶蛙切出正文、批注、已确认三层",
              "npcReaction": "组员的字体建议保留，内容误删被避免",
              "visibleStateChange": "奶蛙切出正文、批注、已确认三层 组员的字体建议保留，内容误删被避免",
              "nextNodeId": "group-assignment.q.final.strategy"
            }
          },
          {
            "id": "group-assignment.q.history.boundary.option.archaeology",
            "label": "让奶蛙拉时间轴：谁埋的，谁来考古复原。",
            "intent": "absurd",
            "stateTags": [
              "absurd"
            ],
            "sourceRefs": [
              "GRP-02",
              "GRP-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "让奶蛙拉时间轴：谁埋的，谁来考古复原。",
            "consequence": {
              "id": "group-assignment.c.history.boundary.archaeology",
              "action": "修订记录变成地层剖面，覆盖操作插着小旗",
              "npcReaction": "修改者自己点回历史版本，现场复原",
              "visibleStateChange": "修订记录变成地层剖面，覆盖操作插着小旗 修改者自己点回历史版本，现场复原",
              "nextNodeId": "group-assignment.q.final.absurd"
            }
          }
        ],
        "stage": 3,
        "prompt": "你打开共享文档，自己的三页被一位组员整段覆盖，修订说明只有“统一风格”。原版还在历史记录里。",
        "sceneObjects": [
          "共享文档",
          "问卷",
          "修订记录",
          "在线 PPT",
          "课程系统",
          "答辩投影"
        ],
        "contentVersion": "group-assignment.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "group-assignment.q.history.strategy": {
        "id": "group-assignment.q.history.strategy",
        "routeId": "group-assignment",
        "sourceRefs": [
          "GRP-02",
          "GRP-04"
        ],
        "options": [
          {
            "id": "group-assignment.q.history.strategy.option.review-together",
            "label": "四页先一起过一遍。你讲得清的留，讲不清的改。",
            "intent": "normal",
            "stateTags": [
              "warm"
            ],
            "sourceRefs": [
              "GRP-02",
              "GRP-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "四页先一起过一遍。你讲得清的留，讲不清的改。",
            "consequence": {
              "id": "group-assignment.c.history.strategy.review-together",
              "action": "奶蛙逐页放大，负责人在旁口述每页意思",
              "npcReaction": "组员承认其中一页没理解，愿意重写",
              "visibleStateChange": "奶蛙逐页放大，负责人在旁口述每页意思 组员承认其中一页没理解，愿意重写",
              "nextNodeId": "group-assignment.q.final.warm"
            }
          },
          {
            "id": "group-assignment.q.history.strategy.option.reject-block",
            "label": "整段粘贴不算交付。今晚只收能说明来源的页。",
            "intent": "boundary",
            "stateTags": [
              "boundary"
            ],
            "sourceRefs": [
              "GRP-02",
              "GRP-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "整段粘贴不算交付。今晚只收能说明来源的页。",
            "consequence": {
              "id": "group-assignment.c.history.strategy.reject-block",
              "action": "四页退回待审区，绿色状态改回黄色",
              "npcReaction": "其他人不会被迫替不明内容兜底",
              "visibleStateChange": "四页退回待审区，绿色状态改回黄色 其他人不会被迫替不明内容兜底",
              "nextNodeId": "group-assignment.q.final.boundary"
            }
          },
          {
            "id": "group-assignment.q.history.strategy.option.lineage",
            "label": "每页补作者、来源、核对人；空着的先不进 final。",
            "intent": "strategy",
            "stateTags": [
              "strategy"
            ],
            "sourceRefs": [
              "GRP-02",
              "GRP-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "每页补作者、来源、核对人；空着的先不进 final。",
            "consequence": {
              "id": "group-assignment.c.history.strategy.lineage",
              "action": "奶蛙给每页加三枚小脚注，缺项立刻可见",
              "npcReaction": "两人分头核引用，负责人补作者说明",
              "visibleStateChange": "奶蛙给每页加三枚小脚注，缺项立刻可见 两人分头核引用，负责人补作者说明",
              "nextNodeId": "group-assignment.q.final.strategy"
            }
          },
          {
            "id": "group-assignment.q.history.strategy.option.lie-detector",
            "label": "点每页“敢不敢念”：不敢点的自动缩成附录。",
            "intent": "absurd",
            "stateTags": [
              "absurd"
            ],
            "sourceRefs": [
              "GRP-02",
              "GRP-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "点每页“敢不敢念”：不敢点的自动缩成附录。",
            "consequence": {
              "id": "group-assignment.c.history.strategy.lie-detector",
              "action": "四页逐张过复选框，一页滑入附录区",
              "npcReaction": "组员主动留下自己能答的三页",
              "visibleStateChange": "四页逐张过复选框，一页滑入附录区 组员主动留下自己能答的三页",
              "nextNodeId": "group-assignment.q.final.absurd"
            }
          }
        ],
        "stage": 3,
        "prompt": "交付清单看起来全绿，修订记录却显示一名组员凌晨一次性粘进 4 页，引用和数据列都没改过。距冻结还有三小时。",
        "sceneObjects": [
          "共享文档",
          "问卷",
          "修订记录",
          "在线 PPT",
          "课程系统",
          "答辩投影"
        ],
        "contentVersion": "group-assignment.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "group-assignment.q.history.absurd": {
        "id": "group-assignment.q.history.absurd",
        "routeId": "group-assignment",
        "sourceRefs": [
          "GRP-02",
          "GRP-04"
        ],
        "options": [
          {
            "id": "group-assignment.q.history.absurd.option.give-role",
            "label": "可以，先把整套讲一遍，卡住的地方再补。",
            "intent": "normal",
            "stateTags": [
              "warm"
            ],
            "sourceRefs": [
              "GRP-02",
              "GRP-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "可以，先把整套讲一遍，卡住的地方再补。",
            "consequence": {
              "id": "group-assignment.c.history.absurd.give-role",
              "action": "奶蛙把激光笔交给句号本人，同时打开计时排练",
              "npcReaction": "他讲到数据页卡住，主动认领补学",
              "visibleStateChange": "奶蛙把激光笔交给句号本人，同时打开计时排练 他讲到数据页卡住，主动认领补学",
              "nextNodeId": "group-assignment.q.final.warm"
            }
          },
          {
            "id": "group-assignment.q.history.absurd.option.no-credit",
            "label": "只答辩不等于做内容。先认领一块可验收的任务。",
            "intent": "boundary",
            "stateTags": [
              "boundary"
            ],
            "sourceRefs": [
              "GRP-02",
              "GRP-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "只答辩不等于做内容。先认领一块可验收的任务。",
            "consequence": {
              "id": "group-assignment.c.history.absurd.no-credit",
              "action": "奶蛙把“口播”与“内容交付”拆成两个格",
              "npcReaction": "对方改领引用检查和第 12 页讲解",
              "visibleStateChange": "奶蛙把“口播”与“内容交付”拆成两个格 对方改领引用检查和第 12 页讲解",
              "nextNodeId": "group-assignment.q.final.boundary"
            }
          },
          {
            "id": "group-assignment.q.history.absurd.option.rehearsal-log",
            "label": "答辩可以算贡献，但排练记录和问题清单也要留下。",
            "intent": "strategy",
            "stateTags": [
              "strategy"
            ],
            "sourceRefs": [
              "GRP-02",
              "GRP-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "答辩可以算贡献，但排练记录和问题清单也要留下。",
            "consequence": {
              "id": "group-assignment.c.history.absurd.rehearsal-log",
              "action": "热力图旁新增排练时长、错题和修订三栏",
              "npcReaction": "表达工作被看见，也不能遮掉内容缺口",
              "visibleStateChange": "热力图旁新增排练时长、错题和修订三栏 表达工作被看见，也不能遮掉内容缺口",
              "nextNodeId": "group-assignment.q.final.strategy"
            }
          },
          {
            "id": "group-assignment.q.history.absurd.option.period-slide",
            "label": "给那个句号单开一页：请作者解释它对全文的贡献。",
            "intent": "absurd",
            "stateTags": [
              "absurd"
            ],
            "sourceRefs": [
              "GRP-02",
              "GRP-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "给那个句号单开一页：请作者解释它对全文的贡献。",
            "consequence": {
              "id": "group-assignment.c.history.absurd.period-slide",
              "action": "奶蛙放大句号到全屏，下面出现三秒倒计时",
              "npcReaction": "全组笑完，句号本人请求换成真任务",
              "visibleStateChange": "奶蛙放大句号到全屏，下面出现三秒倒计时 全组笑完，句号本人请求换成真任务",
              "nextNodeId": "group-assignment.q.final.absurd"
            }
          }
        ],
        "stage": 3,
        "prompt": "奶蛙把修订记录做成贡献热力图：两个人红得发烫，两个人淡绿，还有一位只在标题后加过句号。句号本人发来：“我可以负责答辩。”",
        "sceneObjects": [
          "共享文档",
          "问卷",
          "修订记录",
          "在线 PPT",
          "课程系统",
          "答辩投影"
        ],
        "contentVersion": "group-assignment.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "group-assignment.q.final.warm": {
        "id": "group-assignment.q.final.warm",
        "routeId": "group-assignment",
        "sourceRefs": [
          "GRP-01",
          "GRP-02"
        ],
        "options": [
          {
            "id": "group-assignment.q.final.warm.option.online",
            "label": "先以在线版为底，大家把自己那几页当场确认。",
            "intent": "normal",
            "stateTags": [
              "warm"
            ],
            "sourceRefs": [
              "GRP-01",
              "GRP-02"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "先以在线版为底，大家把自己那几页当场确认。",
            "consequence": {
              "id": "group-assignment.c.final.warm.online",
              "action": "奶蛙把在线版投到中间，五人逐页亮确认灯",
              "npcReaction": "两份本地版的有效改动被口头指出，没有整包覆盖",
              "visibleStateChange": "奶蛙把在线版投到中间，五人逐页亮确认灯 两份本地版的有效改动被口头指出，没有整包覆盖",
              "nextNodeId": "group-assignment.q.submit.warm"
            }
          },
          {
            "id": "group-assignment.q.final.warm.option.freeze-own",
            "label": "我的三页只认昨晚确认的版本，别再从本地包覆盖。",
            "intent": "strategy",
            "stateTags": [
              "boundary"
            ],
            "sourceRefs": [
              "GRP-01",
              "GRP-02"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "我的三页只认昨晚确认的版本，别再从本地包覆盖。",
            "consequence": {
              "id": "group-assignment.c.final.warm.freeze-own",
              "action": "奶蛙给三页加版本时间与负责人锁",
              "npcReaction": "组员转而用批注提改动，不再直接替换",
              "visibleStateChange": "奶蛙给三页加版本时间与负责人锁 组员转而用批注提改动，不再直接替换",
              "nextNodeId": "group-assignment.q.submit.boundary"
            }
          },
          {
            "id": "group-assignment.q.final.warm.option.diff",
            "label": "三版先做差异表：页码、修改人、数据源，合完只留一个。",
            "intent": "boundary",
            "stateTags": [
              "strategy"
            ],
            "sourceRefs": [
              "GRP-01",
              "GRP-02"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "三版先做差异表：页码、修改人、数据源，合完只留一个。",
            "consequence": {
              "id": "group-assignment.c.final.warm.diff",
              "action": "奶蛙摊开三列差异，冲突图表被红线连到原表",
              "npcReaction": "全组确认哪张图来自可追溯数据",
              "visibleStateChange": "奶蛙摊开三列差异，冲突图表被红线连到原表 全组确认哪张图来自可追溯数据",
              "nextNodeId": "group-assignment.q.submit.warm"
            }
          },
          {
            "id": "group-assignment.q.final.warm.option.passport",
            "label": "让三个 final 排队过关：说不清来源的文件不许叫 final。",
            "intent": "absurd",
            "stateTags": [
              "absurd"
            ],
            "sourceRefs": [
              "GRP-01",
              "GRP-02"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "让三个 final 排队过关：说不清来源的文件不许叫 final。",
            "consequence": {
              "id": "group-assignment.c.final.warm.passport",
              "action": "奶蛙给三份文件检查来源护照，只有一份盖满章",
              "npcReaction": "另两份被改名成“待合并”，没人再争正统",
              "visibleStateChange": "奶蛙给三份文件检查来源护照，只有一份盖满章 另两份被改名成“待合并”，没人再争正统",
              "nextNodeId": "group-assignment.q.submit.boundary"
            }
          }
        ],
        "stage": 4,
        "prompt": "排练前，群里同时出现“最终版.pptx”“最终版2.pptx”和在线 PPT。三份页数一样，数据图却各不相同。",
        "sceneObjects": [
          "共享文档",
          "问卷",
          "修订记录",
          "在线 PPT",
          "课程系统",
          "答辩投影"
        ],
        "contentVersion": "group-assignment.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "group-assignment.q.final.boundary": {
        "id": "group-assignment.q.final.boundary",
        "routeId": "group-assignment",
        "sourceRefs": [
          "GRP-01",
          "GRP-02"
        ],
        "options": [
          {
            "id": "group-assignment.q.final.boundary.option.review",
            "label": "风格可以看，但先只合大家都确认的改动。",
            "intent": "normal",
            "stateTags": [
              "warm"
            ],
            "sourceRefs": [
              "GRP-01",
              "GRP-02"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "风格可以看，但先只合大家都确认的改动。",
            "consequence": {
              "id": "group-assignment.c.final.boundary.review",
              "action": "奶蛙把字体改动与内容改动拆成两张清单",
              "npcReaction": "组员保留配色建议，撤回未经确认的数据图",
              "visibleStateChange": "奶蛙把字体改动与内容改动拆成两张清单 组员保留配色建议，撤回未经确认的数据图",
              "nextNodeId": "group-assignment.q.submit.warm"
            }
          },
          {
            "id": "group-assignment.q.final.boundary.option.reject",
            "label": "冻结后不整包替换。这个版本留着，不作为提交版。",
            "intent": "strategy",
            "stateTags": [
              "boundary"
            ],
            "sourceRefs": [
              "GRP-01",
              "GRP-02"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "冻结后不整包替换。这个版本留着，不作为提交版。",
            "consequence": {
              "id": "group-assignment.c.final.boundary.reject",
              "action": "本地文件被移到“冻结后候选”文件夹，提交位不变",
              "npcReaction": "对方不高兴，但没有夺走提交入口",
              "visibleStateChange": "本地文件被移到“冻结后候选”文件夹，提交位不变 对方不高兴，但没有夺走提交入口",
              "nextNodeId": "group-assignment.q.submit.boundary"
            }
          },
          {
            "id": "group-assignment.q.final.boundary.option.cherry-pick",
            "label": "只挑三项能说明理由的改动，逐项合并并记人。",
            "intent": "boundary",
            "stateTags": [
              "strategy"
            ],
            "sourceRefs": [
              "GRP-01",
              "GRP-02"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "只挑三项能说明理由的改动，逐项合并并记人。",
            "consequence": {
              "id": "group-assignment.c.final.boundary.cherry-pick",
              "action": "奶蛙给三项改动打勾，其他变更保持灰色",
              "npcReaction": "组员解释清楚两项，第三项自己撤回",
              "visibleStateChange": "奶蛙给三项改动打勾，其他变更保持灰色 组员解释清楚两项，第三项自己撤回",
              "nextNodeId": "group-assignment.q.submit.warm"
            }
          },
          {
            "id": "group-assignment.q.final.boundary.option.runway",
            "label": "把两版并排走秀，数据源卡和修订记录才是入场券。",
            "intent": "absurd",
            "stateTags": [
              "absurd"
            ],
            "sourceRefs": [
              "GRP-01",
              "GRP-02"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "把两版并排走秀，数据源卡和修订记录才是入场券。",
            "consequence": {
              "id": "group-assignment.c.final.boundary.runway",
              "action": "两份 PPT 在投影上逐页滑过，缺来源页被拦在红毯外",
              "npcReaction": "大家笑着选回冻结版，只借了新配色",
              "visibleStateChange": "两份 PPT 在投影上逐页滑过，缺来源页被拦在红毯外 大家笑着选回冻结版，只借了新配色",
              "nextNodeId": "group-assignment.q.submit.boundary"
            }
          }
        ],
        "stage": 4,
        "prompt": "22:00 已冻结，一名组员又上传本地“老师喜欢的风格版”，把字体、顺序和两张图一起换了。他说：“直接交这个吧。”",
        "sceneObjects": [
          "共享文档",
          "问卷",
          "修订记录",
          "在线 PPT",
          "课程系统",
          "答辩投影"
        ],
        "contentVersion": "group-assignment.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "group-assignment.q.final.strategy": {
        "id": "group-assignment.q.final.strategy",
        "routeId": "group-assignment",
        "sourceRefs": [
          "GRP-01",
          "GRP-02"
        ],
        "options": [
          {
            "id": "group-assignment.q.final.strategy.option.ask-sync",
            "label": "结论先别删。你把依据补上，我们 23:10 再确认一次。",
            "intent": "normal",
            "stateTags": [
              "warm"
            ],
            "sourceRefs": [
              "GRP-01",
              "GRP-02"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "结论先别删。你把依据补上，我们 23:10 再确认一次。",
            "consequence": {
              "id": "group-assignment.c.final.strategy.ask-sync",
              "action": "奶蛙把结论标为待确认，并开二十分钟复核窗",
              "npcReaction": "修改者找到对应数据，补完后全组再看",
              "visibleStateChange": "奶蛙把结论标为待确认，并开二十分钟复核窗 修改者找到对应数据，补完后全组再看",
              "nextNodeId": "group-assignment.q.submit.warm"
            }
          },
          {
            "id": "group-assignment.q.final.strategy.option.rollback",
            "label": "没有同步依据就回滚，冻结规则对谁都一样。",
            "intent": "boundary",
            "stateTags": [
              "boundary"
            ],
            "sourceRefs": [
              "GRP-01",
              "GRP-02"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "没有同步依据就回滚，冻结规则对谁都一样。",
            "consequence": {
              "id": "group-assignment.c.final.strategy.rollback",
              "action": "奶蛙一键还原 22:50 版本，保留新结论在批注里",
              "npcReaction": "修改者接受先留建议、不改提交版",
              "visibleStateChange": "奶蛙一键还原 22:50 版本，保留新结论在批注里 修改者接受先留建议、不改提交版",
              "nextNodeId": "group-assignment.q.submit.boundary"
            }
          },
          {
            "id": "group-assignment.q.final.strategy.option.new-version",
            "label": "通过复核再升 v1.1；没通过就保持 v1.0。",
            "intent": "strategy",
            "stateTags": [
              "strategy"
            ],
            "sourceRefs": [
              "GRP-01",
              "GRP-02"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "通过复核再升 v1.1；没通过就保持 v1.0。",
            "consequence": {
              "id": "group-assignment.c.final.strategy.new-version",
              "action": "版本树只允许从复核节点长出 v1.1",
              "npcReaction": "全组用同一规则决定是否升级",
              "visibleStateChange": "版本树只允许从复核节点长出 v1.1 全组用同一规则决定是否升级",
              "nextNodeId": "group-assignment.q.submit.warm"
            }
          },
          {
            "id": "group-assignment.q.final.strategy.option.quarantine",
            "label": "22:50 后的灵感先住隔离酒店，退房要带数据证明。",
            "intent": "absurd",
            "stateTags": [
              "absurd"
            ],
            "sourceRefs": [
              "GRP-01",
              "GRP-02"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "22:50 后的灵感先住隔离酒店，退房要带数据证明。",
            "consequence": {
              "id": "group-assignment.c.final.strategy.quarantine",
              "action": "奶蛙把新结论放进“灵感隔离区”，门口摆一张数据通行证",
              "npcReaction": "修改者补证成功，灵感按流程出区",
              "visibleStateChange": "奶蛙把新结论放进“灵感隔离区”，门口摆一张数据通行证 修改者补证成功，灵感按流程出区",
              "nextNodeId": "group-assignment.q.submit.boundary"
            }
          }
        ],
        "stage": 4,
        "prompt": "差异表已经合完，提交版命名为 `GA_v1.0_2250.pptx`。22:53，一名同学在线改了结论，却没同步数据表。",
        "sceneObjects": [
          "共享文档",
          "问卷",
          "修订记录",
          "在线 PPT",
          "课程系统",
          "答辩投影"
        ],
        "contentVersion": "group-assignment.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "group-assignment.q.final.absurd": {
        "id": "group-assignment.q.final.absurd",
        "routeId": "group-assignment",
        "sourceRefs": [
          "GRP-01",
          "GRP-02"
        ],
        "options": [
          {
            "id": "group-assignment.q.final.absurd.option.rehearse-one",
            "label": "先一起过在线版，讲完这版再决定要不要导出。",
            "intent": "normal",
            "stateTags": [
              "warm"
            ],
            "sourceRefs": [
              "GRP-01",
              "GRP-02"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "先一起过在线版，讲完这版再决定要不要导出。",
            "consequence": {
              "id": "group-assignment.c.final.absurd.rehearse-one",
              "action": "奶蛙把其余三份缩到角落，只播放同一在线版本",
              "npcReaction": "排练中大家找出一处确实需要改的页",
              "visibleStateChange": "奶蛙把其余三份缩到角落，只播放同一在线版本 排练中大家找出一处确实需要改的页",
              "nextNodeId": "group-assignment.q.submit.warm"
            }
          },
          {
            "id": "group-assignment.q.final.absurd.option.archive-three",
            "label": "除了确认版，其他三个全进归档，谁都别再拿来交。",
            "intent": "boundary",
            "stateTags": [
              "boundary"
            ],
            "sourceRefs": [
              "GRP-01",
              "GRP-02"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "除了确认版，其他三个全进归档，谁都别再拿来交。",
            "consequence": {
              "id": "group-assignment.c.final.absurd.archive-three",
              "action": "三份文件被拖入只读归档，提交区只剩一份",
              "npcReaction": "句号本人终于能对着唯一版本练",
              "visibleStateChange": "三份文件被拖入只读归档，提交区只剩一份 句号本人终于能对着唯一版本练",
              "nextNodeId": "group-assignment.q.submit.boundary"
            }
          },
          {
            "id": "group-assignment.q.final.absurd.option.manifest",
            "label": "建 manifest：唯一文件名、页数、校验值、确认时间。",
            "intent": "strategy",
            "stateTags": [
              "strategy"
            ],
            "sourceRefs": [
              "GRP-01",
              "GRP-02"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "建 manifest：唯一文件名、页数、校验值、确认时间。",
            "consequence": {
              "id": "group-assignment.c.final.absurd.manifest",
              "action": "奶蛙在提交版旁生成四项身份卡",
              "npcReaction": "五个人对同一身份卡点确认",
              "visibleStateChange": "奶蛙在提交版旁生成四项身份卡 五个人对同一身份卡点确认",
              "nextNodeId": "group-assignment.q.submit.warm"
            }
          },
          {
            "id": "group-assignment.q.final.absurd.option.crown",
            "label": "四个 final 只能留一个王冠；修订记录投票，不看文件名气势。",
            "intent": "absurd",
            "stateTags": [
              "absurd"
            ],
            "sourceRefs": [
              "GRP-01",
              "GRP-02"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "四个 final 只能留一个王冠；修订记录投票，不看文件名气势。",
            "consequence": {
              "id": "group-assignment.c.final.absurd.crown",
              "action": "奶蛙把纸王冠戴到有完整来源和确认记录的版本上",
              "npcReaction": "`真的别改了`被降级为历史文物",
              "visibleStateChange": "奶蛙把纸王冠戴到有完整来源和确认记录的版本上 `真的别改了`被降级为历史文物",
              "nextNodeId": "group-assignment.q.submit.boundary"
            }
          }
        ],
        "stage": 4,
        "prompt": "投影上出现四份文件：`final`、`final2`、`final_真`、`final_真的别改了`。句号本人问：“哪个是我明天讲的？”",
        "sceneObjects": [
          "共享文档",
          "问卷",
          "修订记录",
          "在线 PPT",
          "课程系统",
          "答辩投影"
        ],
        "contentVersion": "group-assignment.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "group-assignment.q.submit.warm": {
        "id": "group-assignment.q.submit.warm",
        "routeId": "group-assignment",
        "sourceRefs": [
          "GRP-05"
        ],
        "options": [
          {
            "id": "group-assignment.q.submit.warm.option.contact",
            "label": "先别互相怪。马上给老师说明，附正确文件和回执。",
            "intent": "normal",
            "stateTags": [
              "warm"
            ],
            "sourceRefs": [
              "GRP-05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "先别互相怪。马上给老师说明，附正确文件和回执。",
            "consequence": {
              "id": "group-assignment.c.submit.warm.contact",
              "action": "玩家确认后，奶蛙把错误回执、正确文件和一句说明排成附件",
              "npcReaction": "提交人配合发出说明，全组停止群里互骂",
              "visibleStateChange": "玩家确认后，奶蛙把错误回执、正确文件和一句说明排成附件 提交人配合发出说明，全组停止群里互骂",
              "nextNodeId": "group-assignment.q.defense.warm"
            }
          },
          {
            "id": "group-assignment.q.submit.warm.option.no-blame",
            "label": "别写成我让你交的。谁操作、哪步错，按记录说。",
            "intent": "boundary",
            "stateTags": [
              "boundary"
            ],
            "sourceRefs": [
              "GRP-05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "别写成我让你交的。谁操作、哪步错，按记录说。",
            "consequence": {
              "id": "group-assignment.c.submit.warm.no-blame",
              "action": "奶蛙把操作时间线投到群里，责任不被口头甩给个人",
              "npcReaction": "提交人承认选错附件，开始共同补救",
              "visibleStateChange": "奶蛙把操作时间线投到群里，责任不被口头甩给个人 提交人承认选错附件，开始共同补救",
              "nextNodeId": "group-assignment.q.defense.boundary"
            }
          },
          {
            "id": "group-assignment.q.submit.warm.option.retry-check",
            "label": "先看重交入口；没有就一次发齐差异、正确文件和请求。",
            "intent": "strategy",
            "stateTags": [
              "strategy"
            ],
            "sourceRefs": [
              "GRP-05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "先看重交入口；没有就一次发齐差异、正确文件和请求。",
            "consequence": {
              "id": "group-assignment.c.submit.warm.retry-check",
              "action": "奶蛙检查系统状态，生成 12 页与 15 页差异摘要",
              "npcReaction": "全组只向老师发一次完整请求",
              "visibleStateChange": "奶蛙检查系统状态，生成 12 页与 15 页差异摘要 全组只向老师发一次完整请求",
              "nextNodeId": "group-assignment.q.defense.warm"
            }
          },
          {
            "id": "group-assignment.q.submit.warm.option.scene",
            "label": "让提交人复盘犯罪现场：哪个文件夹、几点、点了哪一份。",
            "intent": "absurd",
            "stateTags": [
              "absurd"
            ],
            "sourceRefs": [
              "GRP-05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "让提交人复盘犯罪现场：哪个文件夹、几点、点了哪一份。",
            "consequence": {
              "id": "group-assignment.c.submit.warm.scene",
              "action": "奶蛙用文件图标重放三步操作，错点位置亮红",
              "npcReaction": "大家找到错误源头，也发现预览本可拦住",
              "visibleStateChange": "奶蛙用文件图标重放三步操作，错点位置亮红 大家找到错误源头，也发现预览本可拦住",
              "nextNodeId": "group-assignment.q.defense.boundary"
            }
          }
        ],
        "stage": 5,
        "prompt": "23:42，课程系统回执显示已提交，但预览只有 12 页。提交人脸白了：“我好像传了排练版。”系统是否允许重交还不确定。",
        "sceneObjects": [
          "共享文档",
          "问卷",
          "修订记录",
          "在线 PPT",
          "课程系统",
          "答辩投影"
        ],
        "contentVersion": "group-assignment.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "group-assignment.q.submit.boundary": {
        "id": "group-assignment.q.submit.boundary",
        "routeId": "group-assignment",
        "sourceRefs": [
          "GRP-05"
        ],
        "options": [
          {
            "id": "group-assignment.q.submit.boundary.option.group-fix",
            "label": "我可以一起补救，但不能替你编。先在群里说清楚。",
            "intent": "normal",
            "stateTags": [
              "warm"
            ],
            "sourceRefs": [
              "GRP-05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "我可以一起补救，但不能替你编。先在群里说清楚。",
            "consequence": {
              "id": "group-assignment.c.submit.boundary.group-fix",
              "action": "奶蛙把私聊折回五人群，隐去无关内容只保留事实",
              "npcReaction": "提交人公开承认选错，全组开始找重交通道",
              "visibleStateChange": "奶蛙把私聊折回五人群，隐去无关内容只保留事实 提交人公开承认选错，全组开始找重交通道",
              "nextNodeId": "group-assignment.q.defense.warm"
            }
          },
          {
            "id": "group-assignment.q.submit.boundary.option.refuse-blame",
            "label": "不是我操作的，我不背这个。按回执和记录说明。",
            "intent": "boundary",
            "stateTags": [
              "boundary"
            ],
            "sourceRefs": [
              "GRP-05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "不是我操作的，我不背这个。按回执和记录说明。",
            "consequence": {
              "id": "group-assignment.c.submit.boundary.refuse-blame",
              "action": "奶蛙将回执上的提交账号和时间圈出，不公开额外隐私",
              "npcReaction": "对方停止甩责，转去准备说明",
              "visibleStateChange": "奶蛙将回执上的提交账号和时间圈出，不公开额外隐私 对方停止甩责，转去准备说明",
              "nextNodeId": "group-assignment.q.defense.boundary"
            }
          },
          {
            "id": "group-assignment.q.submit.boundary.option.one-owner",
            "label": "你负责写事实，我核附件，组长统一发给老师。",
            "intent": "strategy",
            "stateTags": [
              "strategy"
            ],
            "sourceRefs": [
              "GRP-05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "你负责写事实，我核附件，组长统一发给老师。",
            "consequence": {
              "id": "group-assignment.c.submit.boundary.one-owner",
              "action": "奶蛙把补救拆成说明、附件、发送三格，分别署名",
              "npcReaction": "三个人同步完成，不再多头联系老师",
              "visibleStateChange": "奶蛙把补救拆成说明、附件、发送三格，分别署名 三个人同步完成，不再多头联系老师",
              "nextNodeId": "group-assignment.q.defense.warm"
            }
          },
          {
            "id": "group-assignment.q.submit.boundary.option.receipt-speaks",
            "label": "把回执请上桌：它认识谁点的，不认识“大家都以为”。",
            "intent": "absurd",
            "stateTags": [
              "absurd"
            ],
            "sourceRefs": [
              "GRP-05"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "把回执请上桌：它认识谁点的，不认识“大家都以为”。",
            "consequence": {
              "id": "group-assignment.c.submit.boundary.receipt-speaks",
              "action": "奶蛙给回执架麦克风，时间戳占满屏幕",
              "npcReaction": "提交人被具体证据说服，自己去解释",
              "visibleStateChange": "奶蛙给回执架麦克风，时间戳占满屏幕 提交人被具体证据说服，自己去解释",
              "nextNodeId": "group-assignment.q.defense.boundary"
            }
          }
        ],
        "stage": 5,
        "prompt": "系统里是错版。提交人私聊你：“你平时负责整合，要不就说是你给错文件？”群里还没人知道。",
        "sceneObjects": [
          "共享文档",
          "问卷",
          "修订记录",
          "在线 PPT",
          "课程系统",
          "答辩投影"
        ],
        "contentVersion": "group-assignment.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "group-assignment.q.defense.warm": {
        "id": "group-assignment.q.defense.warm",
        "routeId": "group-assignment",
        "sourceRefs": [
          "GRP-03",
          "GRP-04"
        ],
        "options": [
          {
            "id": "group-assignment.q.defense.warm.option.let-answer",
            "label": "让他先按排练回答；卡住时，负责数据的人再补。",
            "intent": "normal",
            "stateTags": [
              "warm"
            ],
            "sourceRefs": [
              "GRP-03",
              "GRP-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "让他先按排练回答；卡住时，负责数据的人再补。",
            "consequence": {
              "id": "group-assignment.c.defense.warm.let-answer",
              "action": "奶蛙把激光笔留在被抽同学手里，数据负责人只举一张补充卡",
              "npcReaction": "他讲出原站和口径，算式由数据负责人补完整",
              "visibleStateChange": "奶蛙把激光笔留在被抽同学手里，数据负责人只举一张补充卡 他讲出原站和口径，算式由数据负责人补完整",
              "nextNodeId": "result"
            }
          },
          {
            "id": "group-assignment.q.defense.warm.option.scope",
            "label": "他答自己核过的引用，不让他冒充数据作者。",
            "intent": "boundary",
            "stateTags": [
              "boundary"
            ],
            "sourceRefs": [
              "GRP-03",
              "GRP-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "他答自己核过的引用，不让他冒充数据作者。",
            "consequence": {
              "id": "group-assignment.c.defense.warm.scope",
              "action": "投影页脚亮出“引用核查 / 数据处理”两项署名",
              "npcReaction": "老师按真实分工分别追问，没有逼一个人认全套",
              "visibleStateChange": "投影页脚亮出“引用核查 / 数据处理”两项署名 老师按真实分工分别追问，没有逼一个人认全套",
              "nextNodeId": "result"
            }
          },
          {
            "id": "group-assignment.q.defense.warm.option.open-source",
            "label": "打开来源表和计算步骤，谁答都对着同一条证据链。",
            "intent": "strategy",
            "stateTags": [
              "strategy"
            ],
            "sourceRefs": [
              "GRP-03",
              "GRP-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "打开来源表和计算步骤，谁答都对着同一条证据链。",
            "consequence": {
              "id": "group-assignment.c.defense.warm.open-source",
              "action": "奶蛙从第 9 页跳到来源、原表、公式三联页",
              "npcReaction": "被抽同学顺着记录讲清，老师继续问下一页",
              "visibleStateChange": "奶蛙从第 9 页跳到来源、原表、公式三联页 被抽同学顺着记录讲清，老师继续问下一页",
              "nextNodeId": "result"
            }
          },
          {
            "id": "group-assignment.q.defense.warm.option.author-locator",
            "label": "点一下图表，弹出“找作者”：数据、图、核对人依次亮灯。",
            "intent": "absurd",
            "stateTags": [
              "absurd"
            ],
            "sourceRefs": [
              "GRP-03",
              "GRP-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "点一下图表，弹出“找作者”：数据、图、核对人依次亮灯。",
            "consequence": {
              "id": "group-assignment.c.defense.warm.author-locator",
              "action": "三位贡献者头像在投影边缘按环节点亮",
              "npcReaction": "老师笑着让数据作者补一句，不再问“到底谁做的”",
              "visibleStateChange": "三位贡献者头像在投影边缘按环节点亮 老师笑着让数据作者补一句，不再问“到底谁做的”",
              "nextNodeId": "result"
            }
          }
        ],
        "stage": 6,
        "prompt": "答辩现场，老师随机抽到一位组员：“第 9 页的数据哪来的？为什么这样算？”他看了你一眼；修订记录显示他至少核过引用。",
        "sceneObjects": [
          "共享文档",
          "问卷",
          "修订记录",
          "在线 PPT",
          "课程系统",
          "答辩投影"
        ],
        "contentVersion": "group-assignment.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      },
      "group-assignment.q.defense.boundary": {
        "id": "group-assignment.q.defense.boundary",
        "routeId": "group-assignment",
        "sourceRefs": [
          "GRP-03",
          "GRP-04"
        ],
        "options": [
          {
            "id": "group-assignment.q.defense.boundary.option.honest",
            "label": "这页不是我写的，我讲我核过的部分，再请作者补充。",
            "intent": "normal",
            "stateTags": [
              "warm"
            ],
            "sourceRefs": [
              "GRP-03",
              "GRP-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "normal": 1
            },
            "signatureFlags": [],
            "evidence": "这页不是我写的，我讲我核过的部分，再请作者补充。",
            "consequence": {
              "id": "group-assignment.c.defense.boundary.honest",
              "action": "奶蛙在修订记录中定位真正修改者，同时保留你的核验页",
              "npcReaction": "老师接受分工说明，转问作者依据",
              "visibleStateChange": "奶蛙在修订记录中定位真正修改者，同时保留你的核验页 老师接受分工说明，转问作者依据",
              "nextNodeId": "result"
            }
          },
          {
            "id": "group-assignment.q.defense.boundary.option.no-claim",
            "label": "我不能替这句背书；确认版里没有它。",
            "intent": "boundary",
            "stateTags": [
              "boundary"
            ],
            "sourceRefs": [
              "GRP-03",
              "GRP-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "boundary": 1
            },
            "signatureFlags": [],
            "evidence": "我不能替这句背书；确认版里没有它。",
            "consequence": {
              "id": "group-assignment.c.defense.boundary.no-claim",
              "action": "冻结版与现场版差异在投影上高亮一行",
              "npcReaction": "老师看到版本问题，要求小组说明而非只压你",
              "visibleStateChange": "冻结版与现场版差异在投影上高亮一行 老师看到版本问题，要求小组说明而非只压你",
              "nextNodeId": "result"
            }
          },
          {
            "id": "group-assignment.q.defense.boundary.option.timeline",
            "label": "看 22:50 冻结点和 22:53 修改记录，再回答这句依据。",
            "intent": "strategy",
            "stateTags": [
              "strategy"
            ],
            "sourceRefs": [
              "GRP-03",
              "GRP-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "strategy": 1
            },
            "signatureFlags": [],
            "evidence": "看 22:50 冻结点和 22:53 修改记录，再回答这句依据。",
            "consequence": {
              "id": "group-assignment.c.defense.boundary.timeline",
              "action": "奶蛙拉出三分钟版本时间线，结论与数据不同步清楚可见",
              "npcReaction": "修改者承认漏同步，老师据此评价流程",
              "visibleStateChange": "奶蛙拉出三分钟版本时间线，结论与数据不同步清楚可见 修改者承认漏同步，老师据此评价流程",
              "nextNodeId": "result"
            }
          },
          {
            "id": "group-assignment.q.defense.boundary.option.fossil",
            "label": "申请把这句列为“冻结后化石”，由发现它的人解释年代。",
            "intent": "absurd",
            "stateTags": [
              "absurd"
            ],
            "sourceRefs": [
              "GRP-03",
              "GRP-04"
            ],
            "requiresConfirmation": true,
            "scoreEffects": {
              "absurd": 1
            },
            "signatureFlags": [
              "consistent-absurd"
            ],
            "evidence": "申请把这句列为“冻结后化石”，由发现它的人解释年代。",
            "consequence": {
              "id": "group-assignment.c.defense.boundary.fossil",
              "action": "结论被框进化石展签，旁边显示修改账号和时间",
              "npcReaction": "现场笑过后，作者必须具体说明为何新增",
              "visibleStateChange": "结论被框进化石展签，旁边显示修改账号和时间 现场笑过后，作者必须具体说明为何新增",
              "nextNodeId": "result"
            }
          }
        ],
        "stage": 6,
        "prompt": "老师抽到你，却指着一页冻结后由别人改过的结论问：“这是你的判断吗？”全组都看着你。",
        "sceneObjects": [
          "共享文档",
          "问卷",
          "修订记录",
          "在线 PPT",
          "课程系统",
          "答辩投影"
        ],
        "contentVersion": "group-assignment.graph.preview.2026-07-22.v1",
        "approvalStatus": "source-reviewed"
      }
    },
    "canonicalPath": [
      "group-assignment.q.divide.option.framework",
      "group-assignment.q.data.warm.option.ask-link",
      "group-assignment.q.history.warm.option.check-in",
      "group-assignment.q.final.warm.option.online",
      "group-assignment.q.submit.warm.option.contact",
      "group-assignment.q.defense.warm.option.let-answer"
    ]
  }
};
