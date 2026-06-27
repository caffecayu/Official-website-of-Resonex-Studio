const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('#site-nav');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const desktopSnap = window.matchMedia('(min-width: 901px) and (hover: hover) and (pointer: fine)');
const pageSections = Array.from(document.querySelectorAll('main > .section'));

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const href = link.getAttribute('href');

    if (!href || href === '#') {
      event.preventDefault();
      return;
    }

    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({
      behavior: reducedMotion.matches ? 'auto' : 'smooth',
      block: 'start',
    });

    if (siteNav) {
      siteNav.classList.remove('is-open');
      navToggle?.setAttribute('aria-expanded', 'false');
    }
  });
});

if (pageSections.length) {
  pageSections[0].classList.add('is-visible');

  if (!reducedMotion.matches) {
    document.body.classList.add('motion-ready');

    const sectionObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.45 },
    );

    pageSections.forEach(section => sectionObserver.observe(section));
  } else {
    pageSections.forEach(section => section.classList.add('is-visible'));
  }
}

if (pageSections.length && !reducedMotion.matches && desktopSnap.matches) {
  let isPaging = false;

  const getCurrentSectionIndex = () => {
    const viewportCenter = window.innerHeight / 2;

    return pageSections.reduce((closestIndex, section, index) => {
      const currentDistance = Math.abs(section.getBoundingClientRect().top - viewportCenter + section.offsetHeight / 2);
      const closestSection = pageSections[closestIndex];
      const closestDistance = Math.abs(
        closestSection.getBoundingClientRect().top - viewportCenter + closestSection.offsetHeight / 2,
      );

      return currentDistance < closestDistance ? index : closestIndex;
    }, 0);
  };

  window.addEventListener(
    'wheel',
    event => {
      if (event.ctrlKey || Math.abs(event.deltaY) < Math.abs(event.deltaX) || Math.abs(event.deltaY) < 12) return;
      if (isPaging) {
        event.preventDefault();
        return;
      }

      const currentIndex = getCurrentSectionIndex();
      const nextIndex = currentIndex + (event.deltaY > 0 ? 1 : -1);

      if (nextIndex < 0 || nextIndex >= pageSections.length) return;

      event.preventDefault();
      isPaging = true;
      pageSections[nextIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });

      window.setTimeout(() => {
        isPaging = false;
      }, 850);
    },
    { passive: false },
  );
}

const worldEvents = [
  {
    date: '2023.06.23',
    title: '瓦格纳兵变',
    summary: '瓦格纳兵变爆发，俄罗斯内战边缘化',
    detail:
      '旷日持久的乌克兰战争进入第二年。由于决策与指挥上的失利，这场本该速胜的战争将俄罗斯拖入泥潭。6月23日，瓦格纳兵变爆发，俄罗斯国家机器第一次在全世界面前显露出无法掩盖的裂痕。',
  },
  {
    date: '2023.06.24',
    title: '“624事件”',
    summary: '“624事件”爆发，克里姆林宫遭炮击，普京宣布下野',
    detail:
      '兵变部队一路畅通无阻，兵临克里姆林宫。面对普京与卢卡申科的劝说，普里戈津没有选择停手。瓦格纳在缺少军委授权的情况下擅自改编为俄罗斯近卫第3师，T-80BV坦克调转炮口，炮轰克宫。当日晚九点，弗拉基米尔·普京宣布下野。',
  },
  {
    date: '2023.07.01',
    title: '三次会谈破裂',
    summary: '中美三次会谈全部不欢而散，台海局势急速升温',
    detail:
      '中美贸易战进入最焦灼的时期。三次会谈全部不欢而散，双方都意识到旧有的外交缓冲正在失效。台海问题从谈判桌上的筹码，逐渐变成双方战争机器启动前最后的倒计时。',
  },
  {
    date: '2023.07.07',
    title: '佩罗西访台计划公开',
    summary: '美国宣布众议院议长佩罗西将于7月访问台湾',
    detail:
      '美国为进一步施压，决定安排众议院议长佩罗西于7月访问台湾。消息公布后，台海局势急速升温。外交、舆论、金融与军事系统同时进入高压状态，战争预案开始从纸面进入现实。',
  },
  {
    date: '2023.07.12',
    title: '台海封锁演习',
    summary: '四大航母舰队进入台湾海峡，中国东部战区宣布台海封锁实弹演习',
    detail:
      '美国派遣四大航母舰队公然进入台湾海峡。中国人民解放军东部战区随即宣布封锁台海，进行为期十五天的实弹演习。第一岛链上空的每一次雷达开机，都意味着局势正向不可逆方向滑落。',
  },
  {
    date: '2023.07.20 - 2023.07.21',
    title: '俄罗斯战略转向',
    summary: '俄罗斯亲西方党派“青年人党”上台，俄乌战争结束，俄乌双方同日加入北约',
    detail:
      '俄罗斯统一党的倒台并没有带来预期中的转机。巨大的权力真空让整个俄罗斯政治体系陷入瘫痪。7月20日，亲西方党派“青年人党”上台，俄罗斯战略方向在一夜之间发生逆转。次日，俄乌战争结束，俄乌双方同日加入北约。旷日持久的战争以一种近乎诡异的方式结束，欧洲战线的火焰没有熄灭，只是被转移到了更远的东方。',
  },
  {
    date: '2023.07.25 - 2023.07.29',
    title: '亚洲包围网成形',
    summary: '印度与北约签订合作协议，东盟—美国峰会结束，双方建立全面战略合作伙伴关系',
    detail:
      '7月25日，印度与北约签订合作协议，南亚方向的压力被正式纳入北约全球战略框架。7月29日，东盟—美国峰会落下帷幕，双方签订全面战略合作伙伴关系。伴随西太平洋、印度洋与东南亚方向的战略节点被相继激活，中国周边安全环境进入全面高压状态。',
  },
  {
    date: 'FINAL',
    title: '全面战略包围',
    summary: '北约完成对中国的全面战略包围',
    detail:
      '至此，北约完成了对中国的全面战略包围。旧秩序崩塌后的真空没有带来和平，反而让所有大国同时看见了最后的生存机遇。战争机器轰鸣运转，世界大战正式进入倒计时。',
  },
];

const worldTimeline = document.querySelector('.world-timeline');
const worldEventCard = document.querySelector('.world-event-card');

if (worldTimeline && worldEventCard) {
  const worldEventDate = worldEventCard.querySelector('.world-event-date');
  const worldEventTitle = worldEventCard.querySelector('h3');
  const worldEventDetail = worldEventCard.querySelector('.world-event-detail');
  let activeWorldEventIndex = 0;
  let worldWheelLocked = false;
  let worldEventTimer;

  const selectWorldEvent = index => {
    activeWorldEventIndex = Math.max(0, Math.min(worldEvents.length - 1, index));
    renderWorldTimeline();
  };

  const updateWorldEventCard = eventData => {
    window.clearTimeout(worldEventTimer);
    worldEventCard.classList.add('is-updating');

    worldEventTimer = window.setTimeout(() => {
      worldEventDate.textContent = eventData.date;
      worldEventTitle.textContent = eventData.title;
      worldEventDetail.textContent = eventData.detail;
      worldEventCard.classList.remove('is-updating');
    }, reducedMotion.matches ? 0 : 120);
  };

  const renderWorldTimeline = () => {
    const activeEvent = worldEvents[activeWorldEventIndex];

    worldTimeline.innerHTML = '';
    updateWorldEventCard(activeEvent);

    worldEvents.forEach((eventData, index) => {
      const item = document.createElement('li');
      const button = document.createElement('button');
      const date = document.createElement('b');
      const summary = document.createElement('span');

      item.className = `${eventData.date === 'FINAL' ? 'is-final' : ''}${index === activeWorldEventIndex ? ' is-active' : ''}`;
      button.type = 'button';
      button.setAttribute('aria-current', index === activeWorldEventIndex ? 'true' : 'false');
      date.textContent = eventData.date;
      summary.textContent = eventData.summary;

      button.append(date, summary);
      button.addEventListener('click', () => selectWorldEvent(index));
      item.appendChild(button);
      worldTimeline.appendChild(item);
    });
  };

  worldTimeline.addEventListener(
    'wheel',
    event => {
      event.preventDefault();
      event.stopPropagation();

      if (Math.abs(event.deltaY) < 8 || worldWheelLocked) return;

      worldWheelLocked = true;
      selectWorldEvent(activeWorldEventIndex + (event.deltaY > 0 ? 1 : -1));

      window.setTimeout(() => {
        worldWheelLocked = false;
      }, 300);
    },
    { passive: false },
  );

  renderWorldTimeline();
}

const campaignPlans = {
  korea: {
    title: '战争疑云',
    mapType: 'korean-peninsula',
    points: [
      {
        id: 'second-korean-war',
        location: '三八线北侧',
        title: '第二次朝鲜战争',
        background:
          '朝鲜半岛再次成为大国对抗的前沿。局部冲突在边境线上迅速升级（此为教学关卡）',
        x: 46.2,
        y: 48.1,
      },
    ],
  },
  darkest: {
    title: '至暗之时',
    mapType: 'east-asia',
    points: [
      {
        id: 'tianjin-retreat',
        location: '天津',
        title: '天津登陆',
        background: '中央人民广播电台，中央人民广播电台，华北紧急调频389.5，向您播报...',
        x: 59.5,
        y: 44.5,
      },
      {
        id: 'shanghai-campaign',
        location: '上海',
        title: '淞沪会战',
        background: '我们正在遭受来自全世界的进攻，同志们，祝好运，我们烈士陵园见！',
        x: 64.8,
        y: 56.5,
      },
      {
        id: 'hong-kong-campaign',
        location: '香港',
        title: '香港战役',
        background: '香港方向承受连续突击，同志，你需要立即利用城镇地形切割敌方装甲与步兵协同。',
        x: 55.8,
        y: 70,
      },
      {
        id: 'dawang-defense',
        location: '达旺',
        title: '达旺保卫战',
        background: '父亲，我将拧断那只猛禽的脖子...',
        x: 28.3,
        y: 62,
      },
      {
        id: 'qingdao-liberation',
        location: '青岛',
        title: '青岛阻击战',
        background: '同志，敌军主力已于青岛登陆，请做好牺牲准备，为友军赢得撤退时间。',
        x: 63.4,
        y: 49.1,
      },
      {
        id: 'zhangjiakou-counter',
        location: '张家口',
        title: '张家口反击战',
        background: '118暴风雨部队向您报道，坚决消灭一切来犯之敌。',
        x: 56.6,
        y: 41.9,
      },
      {
        id: 'beijing-counter',
        location: '北京',
        title: '北京反击战',
        background: '中华民族已经到了最危险的时候，同志们，党和人民考验我们的时候到了。',
        x: 58.5,
        y: 43.3,
      },
    ],
  },
  flames: {
    title: '血肉长城',
    mapType: 'beijing-theater',
    points: [
      {
        id: 'tanggu-blockade',
        location: '北京与天津接壤处',
        title: '塘沽阻击战',
        background: '京津接合部成为敌军突进轴线，防线必须在交通枢纽与火力走廊之间完成阻滞。',
        x: 66.2,
        y: 57,
      },
      {
        id: 'langfang-blockade',
        location: '廊坊区',
        title: '廊坊阻击战',
        background: '我最想的，就是打掉一辆艾布拉姆斯，一辆艾布拉姆斯啊...',
        x: 55.2,
        y: 49.7,
      },
      {
        id: 'beichen-blockade',
        location: '北辰区',
        title: '北辰区阻击战',
        background: '北辰区战线压缩至近距离交战，我方无人部队已在路上，请为友军清理电磁环境。',
        x: 60.2,
        y: 54.2,
      },
      {
        id: 'pinggu-campaign',
        location: '平谷区',
        title: '平谷区会战',
        background: '空中攻击通道已经打开，立即展开侧翼侦察和快速反击。',
        x: 60.1,
        y: 40.4,
      },
      {
        id: 'pingan-street',
        location: '平安街',
        title: '平安街战役',
        background: '增援已经抵达，利用机械狗部队清理城区敌军火力点。',
        x: 51.5,
        y: 43.9,
      },
      {
        id: 'sanhe-counter',
        location: '三河里',
        title: '三河反击战',
        background: '火炮部队已就绪，快速集结你的地面部队切断敌军侧后方。',
        x: 59.6,
        y: 42.8,
      },
    ],
  },
  japan: {
    title: '烈焰升腾',
    mapType: 'pacific-rim',
    points: [
      {
        id: 'beijing-counter-final',
        location: '北京',
        title: '北京反击战',
        background: '西北装甲集群已集合完毕，反攻将于凌晨开始。',
        x: 12.9,
        y: 48.5,
      },
      {
        id: 'qingdao-liberation-final',
        location: '青岛',
        title: '青岛光复',
        background: '同志，海军同志将会从海上配合我部反攻，他们一个也别想跑。',
        x: 15.5,
        y: 51.6,
      },
      {
        id: 'tianjin-counter',
        location: '天津',
        title: '天津反攻',
        background: '天津反攻使北方战线推回海岸，我们即将清剿敌军最后的登陆场。',
        x: 13.4,
        y: 49.1,
      },
      {
        id: 'japan-sinking',
        location: '京都',
        title: '东瀛陆沉',
        background: '北约数百万精锐折戟山东，为守护美国本土，为新战力抵达亚太争取时间，北约决定将日本作为最后的太平洋防线。',
        x: 25.3,
        y: 52.4,
      },
      {
        id: 'los-angeles',
        location: '洛杉矶',
        title: '洛杉矶',
        background: '我当然会下地狱，而你，我们将在地狱里继续厮杀。',
        x: 92.9,
        y: 53.2,
      },
    ],
  },
};

Object.assign(campaignPlans, {
  korea: {
    title: '战争疑云',
    mapImage: 'assets/maps/map-korea.png',
    mapAlt: '朝鲜半岛信息化地图',
    mapTransform: { scale: 1.55, x: -170, y: 0, width: 520, height: 760 },
    points: [
      {
        id: 'second-korean-war',
        location: '三八线北侧某地',
        title: '第二次朝鲜战争',
        background:
          '朝鲜半岛再次成为大国对抗的前沿。局部冲突在边境线上迅速升级（此为教学关卡）',
        x: 455,
        y: 260,
      },
    ],
  },
  darkest: {
    title: '至暗之时',
    mapImage: 'assets/maps/map-east-asia.png',
    mapAlt: '东亚信息化地图',
    mapTransform: { scale: 1.08, x: -40, y: 0, width: 940, height: 660 },
    points: [
      {
        id: 'tianjin-retreat',
        location: '天津',
        title: '天津登陆',
        background: '中央人民广播电台，中央人民广播电台，华北紧急调频389.5，向您播报...',
        x: 660,
        y: 220,
      },
      {
        id: 'shanghai-campaign',
        location: '上海',
        title: '淞沪会战',
        background: '我们正在遭受来自全世界的进攻，同志们，祝好运，我们烈士陵园见！',
        x: 705,
        y: 315,
      },
      {
        id: 'hong-kong-campaign',
        location: '香港',
        title: '香港战役',
        background: '香港方向承受连续突击，同志，你需要立即利用城镇地形切割敌方装甲与步兵协同。',
        x: 635,
        y: 430,
      },
      {
        id: 'dawang-defense',
        location: '达旺',
        title: '达旺保卫战',
        background: '父亲，我将拧断那只猛禽的脖子',
        x: 330,
        y: 365,
      },
      {
        id: 'qingdao-liberation',
        location: '青岛',
        title: '青岛阻击战',
        background: '同志，敌军主力已于青岛登陆，请做好牺牲准备，为友军赢得撤退时间。',
        x: 675,
        y: 255,
      },
      {
        id: 'zhangjiakou-counter',
        location: '张家口',
        title: '张家口反击战',
        background: '118暴风雨部队向您报道，坚决消灭一切来犯之敌。',
        x: 610,
        y: 195,
      },
      {
        id: 'beijing-counter',
        location: '北京',
        title: '北京反击战',
        background: '首都外围进入决战阶段，玩家需要整合侦察、电子压制与地面突击夺回战役节奏。',
        x: 640,
        y: 205,
      },
    ],
  },
  flames: {
    title: '血肉长城',
    mapImage: 'assets/maps/map-beijing.png',
    mapAlt: '京津冀战区信息化地图',
    mapTransform: { scale: 1.18, x: -110, y: 0, width: 680, height: 680 },
    points: [
      {
        id: 'tanggu-blockade',
        location: '北京与天津接壤处',
        title: '塘沽阻击战',
        background: '京津接合部成为敌军突进轴线，防线必须在交通枢纽与火力走廊之间完成阻滞。',
        x: 555,
        y: 255,
      },
      {
        id: 'langfang-blockade',
        location: '廊坊区',
        title: '廊坊阻击战',
        background: '我最想的，就是打掉一辆艾布拉姆斯，一辆艾布拉姆斯啊...',
        x: 535,
        y: 300,
      },
      {
        id: 'beichen-blockade',
        location: '北辰区',
        title: '北辰区阻击战',
        background: '北辰区战线压缩至近距离交战，同志，你需要在复杂的城市环境中利用无人部队清理敌方火力点。',
        x: 610,
        y: 285,
      },
      {
        id: 'pinggu-campaign',
        location: '平谷区',
        title: '平谷区会战',
        background: '空中攻击通道已经打开，立即展开侧翼侦察和快速反击。',
        x: 575,
        y: 230,
      },
      {
        id: 'pingan-street',
        location: '平安街',
        title: '平安街战役',
        background: '增援已经抵达，利用机械狗部队清理城区敌军火力点。',
        x: 505,
        y: 260,
      },
      {
        id: 'sanhe-counter',
        location: '三河里',
        title: '三河反击战',
        background: '火炮部队已就绪，快速集结你的地面部队切断敌军侧后方。',
        x: 590,
        y: 255,
      },
    ],
  },
  japan: {
    title: '燃尽亚太',
    mapImage: 'assets/maps/map-pacific.png',
    mapAlt: '太平洋沿岸信息化地图',
    mapTransform: { scale: 1.08, x: -40, y: 0, width: 940, height: 660 },
    fallbackMapImage: 'assets/maps/map-east-asia.png',
    points: [
      {
        id: 'beijing-counter-final',
        location: '北京',
        title: '北京反击战',
        background: '西北装甲集群已集合完毕，反攻将于凌晨开始。',
        x: 640,
        y: 205,
      },
      {
        id: 'qingdao-liberation-final',
        location: '青岛',
        title: '青岛光复',
        background: '同志，海军同志将会从海上配合我部反攻，他们一个也别想跑。',
        x: 675,
        y: 255,
      },
      {
        id: 'tianjin-counter',
        location: '天津',
        title: '天津反攻',
        background: '天津反攻使北方战线推回海岸，我们即将清剿敌军最后的登陆场。',
        x: 660,
        y: 220,
      },
      {
        id: 'japan-sinking',
        location: '京都',
        title: '东瀛陆沉',
        background: '北约数百万精锐折戟山东，为守护美国本土，为新战力抵达亚太争取时间，北约决定将日本作为最后的太平洋防线。',
        x: 835,
        y: 242,
      },
      {
        id: 'los-angeles',
        location: '洛杉矶',
        title: '洛杉矶',
        background: '太平洋另一端的战火证明战争已经越过最后边界，全球体系进入不可逆的崩解阶段。',
        x: 940,
        y: 286,
      },
    ],
  },
});

const campaignWindowGrid = document.querySelector('.campaign-window-grid');
const campaignPlanIntro = document.querySelector('.campaign-plan-intro');
const campaignMapView = document.querySelector('.campaign-map-view');

if (campaignWindowGrid && campaignMapView) {
  const campaignBack = campaignMapView.querySelector('.campaign-back');
  const campaignMapTitle = campaignMapView.querySelector('.campaign-map-header h3');
  const campaignMapLayout = campaignMapView.querySelector('.campaign-map-layout');
  const tacticalMap = campaignMapView.querySelector('.tactical-map');
  const mapImageLayer = campaignMapView.querySelector('.map-image-layer');
  const mapOverlay = campaignMapView.querySelector('.map-overlay');
  const operationBrief = campaignMapView.querySelector('.operation-brief');
  const briefTitle = operationBrief.querySelector('h4');
  const briefText = operationBrief.querySelector('.brief-content p');
  let activeCampaignKey = null;
  let activePointId = null;
  let campaignBriefTimer;

  const mapShapes = {
    'korean-peninsula': {
      paths: [
        {
          d: 'M55.0,45.4 L60.1,54.3 L61.6,59.1 L61.6,67.8 L59.4,71.9 L54.1,73.3 L49.3,76.4 L44.0,77.1 L43.3,73.0 L44.4,67.4 L41.8,59.6 L46.2,58.3 L42.2,51.9 L45.2,51.5 L47.5,48.1 L51.7,47.7 L54.2,47.2 L55.0,45.4 Z M68.6,17.0 L67.1,17.9 L64.6,20.4 L62.8,23.0 L63.0,28.4 L60.0,30.0 L58.9,31.4 L56.7,33.6 L52.8,34.8 L50.2,36.8 L50.0,40.1 L51.7,42.1 L55.0,45.4 L54.2,47.2 L51.7,47.7 L47.5,48.1 L45.2,51.5 L42.5,51.2 L39.3,50.4 L36.9,52.5 L35.1,50.4 L33.5,49.2 L35.1,45.9 L36.5,45.0 L37.5,39.6 L33.7,37.5 L30.9,35.5 L35.7,30.7 L42.2,26.7 L46.3,21.4 L49.1,23.7 L54.2,24.0 L53.3,20.0 L62.4,16.8 L64.7,12.6 L68.6,17.0 Z',
        },
        {
          d: 'M34,48 L62,48',
          className: 'theater-line',
        },
      ],
      labels: [
        { text: '38TH PARALLEL', x: 50, y: 46 },
        { text: 'WEST SEA', x: 24, y: 58 },
        { text: 'EAST SEA', x: 76, y: 56 },
      ],
      scan: { x: 52, y: 48 },
    },
    'east-asia': {
      paths: [
        {
          d: 'M51.0,75.5 L48.9,74.4 L50.9,73.3 Z M72.4,28.4 L76.0,30.0 L78.4,31.4 L81.5,30.3 L80.3,32.3 L79.1,35.4 L76.5,35.7 L76.7,38.7 L72.9,40.2 L70.6,41.5 L68.2,43.3 L65.6,44.4 L65.0,41.8 L62.5,43.3 L60.5,44.4 L61.6,46.4 L64.0,46.4 L66.1,47.8 L63.7,49.1 L61.9,50.9 L63.7,53.2 L65.3,55.8 L64.8,58.1 L65.0,61.0 L63.4,62.8 L62.4,64.8 L59.6,68.0 L56.5,69.4 L52.9,71.1 L51.2,73.0 L48.8,70.9 L46.4,70.1 L44.9,68.4 L42.6,69.4 L40.3,70.0 L38.3,70.8 L36.9,68.7 L35.5,65.8 L36.7,63.3 L35.7,60.8 L33.5,59.2 L30.2,60.4 L28.1,61.7 L26.0,60.9 L23.6,61.5 L20.8,61.0 L18.4,59.4 L16.5,58.2 L13.3,57.0 L11.7,54.4 L12.3,51.8 L11.0,50.0 L8.6,48.2 L7.3,46.2 L5.8,44.0 L8.0,42.3 L11.4,41.4 L13.8,40.0 L13.6,35.7 L16.0,35.1 L17.6,32.1 L20.0,32.6 L20.7,30.4 L22.7,29.2 L24.5,31.0 L27.2,32.8 L27.1,35.2 L30.3,35.7 L32.5,36.8 L33.8,39.1 L37.7,39.4 L40.5,39.4 L43.9,40.3 L47.8,39.4 L51.1,38.8 L52.7,37.0 L54.9,35.9 L58.0,34.5 L59.8,33.1 L62.5,33.1 L60.6,31.0 L57.7,31.5 L58.3,29.4 L62.1,27.8 L63.2,25.6 L64.2,23.1 L67.3,22.8 L70.3,23.8 L71.5,26.0 L72.4,28.4 Z',
        },
        {
          d: 'M11.0,50.0 L12.7,53.8 L15.0,58.1 L16.1,61.5 L20.1,63.3 L23.7,63.2 L27.5,63.2 L30.2,60.4 L33.5,59.2 L34.8,62.7 L31.6,65.7 L30.0,68.9 L28.2,65.7 L24.2,63.7 L24.1,68.0 L22.2,71.2 L19.9,74.3 L17.6,77.0 L14.6,79.6 L14.0,84.1 L13.5,88.1 L11.1,91.3 L8.9,88.2 L7.3,84.5 L5.7,79.5 L4.8,74.7 L1.9,72.1 L-0.9,67.9 L2.6,66.9 L0.7,63.0 L4.8,59.9 L6.8,56.8 L6.4,53.1 L9.8,51.3 Z M88.8,47.5 L86.3,51.3 L82.4,53.1 L77.9,52.4 L76.9,56.1 L74.5,53.3 L77.6,51.1 L81.0,49.6 L83.6,47.3 L86.9,45.9 L87.5,42.3 L88.8,46.0 Z M92.4,36.9 L89.6,39.1 L90.0,34.8 Z M73.2,45.3 L74.6,49.8 L70.9,51.7 L70.5,48.1 L73.1,45.7 Z M23.2,29.1 L26.8,27.5 L31.1,27.3 L34.9,28.5 L36.9,24.9 L40.8,26.1 L45.5,27.4 L48.7,29.1 L52.6,29.0 L56.0,27.7 L57.7,31.5 L61.5,31.5 L58.0,34.5 L53.6,35.6 L51.1,38.8 L45.8,40.0 L40.5,39.4 L35.1,39.0 L31.7,36.6 L27.1,35.2 L26.3,31.5 L23.2,29.1 Z M64.6,75.7 L65.7,79.1 L67.8,82.9 L63.7,82.8 L62.8,79.0 L64.6,75.7 Z M76.1,39.6 L74.1,42.5 L72.5,45.8 L68.8,46.0 L69.2,42.3 L73.1,41.0 Z M65.1,66.8 L63.9,70.5 L63.8,66.6 Z M48.2,71.1 L45.5,73.8 L47.4,78.5 L49.8,83.4 L48.6,87.1 L44.6,90.7 L46.0,87.2 L47.7,83.3 L47.3,79.7 L44.6,75.5 L42.2,72.3 L44.9,68.4 L48.2,71.1 Z',
          className: 'land-secondary',
        },
        {
          d: 'M68,38 C76,48 82,60 84,76',
          className: 'theater-line',
        },
      ],
      labels: [
        { text: 'EAST ASIA', x: 52, y: 25 },
        { text: 'FIRST ISLAND CHAIN', x: 71, y: 55 },
        { text: 'HIMALAYA', x: 27, y: 70 },
      ],
      scan: { x: 52, y: 54 },
    },
    'beijing-theater': {
      paths: [
        {
          d: 'M71.6,54.4 L72.1,51.1 L69.8,49.6 L69.4,47.2 L67.5,46.7 L66.3,44.5 L66.1,43.1 L66.1,41.9 L67.2,41.3 L67.4,39.1 L66.1,38.3 L64.4,38.0 L62.1,40.2 L62.0,43.3 L61.5,46.1 L59.1,45.9 L57.6,46.9 L57.7,48.5 L57.3,50.3 L57.1,51.4 L57.5,52.5 L57.3,55.2 L56.5,56.2 L56.3,58.1 L57.8,60.1 L59.1,60.7 L60.5,60.2 L63.0,61.5 L64.7,62.3 L66.2,62.2 L66.7,57.4 L68.1,55.5 L71.4,54.3 Z M59.1,45.9 L59.3,44.1 L56.8,41.9 L58.9,40.2 L60.1,40.3 L62.1,40.2 L64.4,38.0 L62.8,36.1 L62.5,34.6 L62.7,33.4 L64.5,31.8 L63.4,31.1 L61.9,30.6 L60.7,31.2 L55.8,26.4 L54.3,26.5 L52.8,27.8 L52.6,29.1 L51.4,28.8 L51.7,31.1 L49.9,31.2 L46.3,33.1 L45.9,34.4 L47.0,35.8 L46.1,37.9 L44.3,38.5 L42.5,40.8 L41.8,43.2 L42.1,45.0 L43.3,46.6 L45.3,48.1 L50.3,47.5 L51.6,48.4 L53.5,48.9 L53.6,47.8 L54.7,47.1 L57.3,47.0 L58.6,46.5 Z M62.1,40.2 L60.1,40.3 L58.9,40.2 L56.9,41.1 L59.3,44.1 L59.0,45.9 L61.5,46.1 L62.0,43.3 L62.1,40.2 Z M41.9,99.2 L42.6,97.9 L40.5,94.7 L41.0,91.4 L44.5,88.6 L48.7,80.7 L50.6,80.3 L52.1,76.9 L53.4,77.6 L58.0,73.7 L61.3,73.1 L64.6,73.5 L65.4,72.6 L65.7,70.5 L67.9,70.0 L68.9,67.9 L66.1,62.8 L64.7,62.3 L63.0,61.5 L60.5,60.2 L59.1,60.7 L57.8,60.1 L56.3,58.1 L56.5,56.2 L57.3,55.2 L57.5,52.5 L57.1,51.4 L57.3,50.3 L57.7,48.5 L57.6,46.9 L54.7,47.1 L53.6,47.8 L53.5,48.9 L51.6,48.4 L50.3,47.5 L45.3,48.1 L43.3,46.6 L42.1,45.0 L41.8,43.2 L42.5,40.8 L44.3,38.5 L46.1,37.9 L47.0,35.8 L45.9,34.4 L46.3,33.1 L49.9,31.2 L51.7,31.1 L51.4,28.8 L52.6,29.1 L52.8,27.8 L54.3,26.5 L55.8,26.4 L60.3,31.2 L61.9,30.6 L63.4,31.1 L64.5,31.8 L62.7,33.4 L62.5,34.6 L62.8,36.1 L64.5,37.9 L66.1,38.3 L67.4,39.1 L67.2,41.3 L66.1,41.9 L66.1,43.1 L66.3,44.5 L67.5,46.7 L69.4,47.2 L69.8,49.6 L71.8,50.1 L71.6,54.4 L72.9,54.5 L74.8,55.7 L77.6,54.3 L80.3,54.3 L82.0,54.2 L83.0,50.9 L85.2,47.0 L88.6,44.6 L88.6,43.3 L93.1,41.4 L91.7,40.6 L91.7,38.3 L90.1,36.6 L89.7,33.6 L86.2,32.8 L85.1,31.2 L83.0,30.7 L81.3,28.1 L82.8,26.7 L82.7,25.0 L85.0,23.7 L85.1,21.7 L83.0,21.3 L81.7,22.0 L75.7,21.0 L75.3,18.3 L73.0,15.0 L73.1,13.9 L73.4,11.5 L71.3,8.5 L70.3,6.0 L68.2,2.6 L66.2,2.3 L63.6,3.7 L61.4,3.8 L58.0,5.5 L57.8,7.0 L58.1,8.5 L57.5,11.7 L53.8,11.7 L52.5,11.0 L49.0,13.4 L47.8,13.3 L46.3,12.6 L41.5,15.1 L39.2,17.6 L35.6,17.2 L35.8,11.9 L34.5,9.6 L30.9,9.2 L27.2,13.9 L26.8,17.0 L24.4,19.2 L23.9,21.6 L24.7,23.0 L23.4,25.0 L26.6,30.3 L27.9,32.3 L28.6,35.3 L30.1,36.3 L27.3,38.2 L25.9,38.6 L25.4,39.8 L25.8,41.6 L27.0,42.0 L29.0,42.6 L29.5,43.8 L29.4,45.6 L30.9,47.6 L30.2,50.8 L29.6,53.9 L27.3,54.9 L24.0,55.1 L22.2,57.0 L23.2,59.2 L20.1,62.4 L20.0,66.5 L22.2,68.2 L23.5,70.9 L26.3,75.8 L23.7,81.2 L23.3,82.8 L22.5,84.1 L22.6,86.9 L20.7,89.2 L19.3,89.6 L19.4,91.5 L21.8,95.6 L25.5,95.7 L26.8,96.9 L30.6,97.4 L31.5,98.5 L32.9,98.8 L34.3,97.8 L36.8,99.5 L39.0,98.2 L41.9,99.2 Z',
        },
      ],
      labels: [
        { text: 'BEIJING THEATER', x: 50, y: 21 },
        { text: 'URBAN GRID', x: 47, y: 52 },
        { text: 'JIN-JI AXIS', x: 66, y: 66 },
      ],
      scan: { x: 58, y: 55 },
    },
    'pacific-rim': {
      paths: [
        {
          d: 'M20.1,40.5 L22.2,42.1 L24.8,41.5 L23.6,44.2 L22.0,46.4 L19.2,47.5 L16.6,49.1 L14.0,49.0 L16.3,50.4 L14.7,52.5 L16.4,55.1 L16.3,57.9 L14.4,60.9 L11.9,62.4 L9.3,63.4 L6.6,62.8 L3.8,62.6 L0.9,61.4 L1.6,58.5 L-1.0,57.1 L-3.5,58.0 L-6.6,57.9 L-8.8,56.4 L-11.3,54.4 L-12.7,51.7 L-14.4,48.8 L-11.5,47.4 L-10.3,44.4 L-8.3,42.4 L-5.6,40.9 L-3.3,42.8 L-0.9,44.9 L2.1,46.3 L5.3,46.8 L8.3,46.3 L10.0,44.2 L12.7,43.7 L15.1,42.7 L12.5,42.1 L14.8,40.2 L15.9,37.6 L19.0,38.0 L20.1,40.5 Z',
        },
        {
          d: 'M28.6,50.7 L24.9,53.4 L28.0,48.8 Z M22.0,46.4 L19.2,50.1 L21.6,46.0 Z M107.9,40.8 L112.6,41.9 L116.0,45.5 L120.6,44.3 L124.9,42.4 L123.4,46.9 L119.9,50.6 L117.1,54.4 L117.3,59.0 L113.7,56.4 L108.9,56.7 L105.2,59.4 L101.6,56.4 L96.1,54.8 L91.6,52.9 L89.3,48.6 L89.3,43.9 L93.7,41.1 L100.1,41.1 L106.3,41.1 Z M69.4,23.1 L74.2,23.9 L78.4,27.3 L78.4,31.9 L83.3,33.5 L78.5,32.4 L73.8,31.6 L69.3,34.0 L64.8,36.2 L68.2,33.1 L63.3,32.0 L61.1,27.6 L64.4,24.2 L69.4,23.1 Z',
          className: 'land-secondary',
        },
        {
          d: 'M31,46 C44,42 55,43 67,50 C75,54 82,55 90,55',
          className: 'theater-line',
        },
      ],
      labels: [
        { text: 'PACIFIC RIM', x: 59, y: 24 },
        { text: 'WEST PACIFIC', x: 55, y: 66 },
        { text: 'NORTH AMERICA', x: 86, y: 42 },
      ],
      scan: { x: 60, y: 50 },
    },
  };

  const renderCampaignWindows = () => {
    campaignWindowGrid.innerHTML = '';

    Object.entries(campaignPlans).forEach(([key, plan], index) => {
      const button = document.createElement('button');
      const code = document.createElement('small');
      const title = document.createElement('b');
      const hint = document.createElement('span');

      button.className = 'campaign-window';
      button.type = 'button';
      code.textContent = `OP-${String(index + 1).padStart(2, '0')}`;
      title.textContent = plan.title;
      hint.textContent = '点击进入战区地图';

      button.append(code, title, hint);
      button.addEventListener('click', () => openCampaignMap(key));
      campaignWindowGrid.appendChild(button);
    });
  };

  const svgNamespace = 'http://www.w3.org/2000/svg';

  const createSvgElement = (name, attributes = {}) => {
    const element = document.createElementNS(svgNamespace, name);

    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });

    return element;
  };

  const renderMapImage = plan => {
    const transform = plan.mapTransform || { scale: 1, x: 0, y: 0 };

    tacticalMap.dataset.mapType = plan.mapImage.includes('korea')
      ? 'korean-peninsula'
      : plan.mapImage.includes('beijing')
        ? 'beijing-theater'
        : plan.mapImage.includes('pacific')
          ? 'pacific-rim'
          : 'east-asia';
    tacticalMap.style.setProperty('--map-scale', transform.scale ?? 1);
    tacticalMap.style.setProperty('--map-x', transform.x ?? 0);
    tacticalMap.style.setProperty('--map-y', transform.y ?? 0);
    tacticalMap.style.setProperty('--scan-x', '50%');
    tacticalMap.style.setProperty('--scan-y', '50%');

    mapImageLayer.classList.remove('is-fallback');
    mapImageLayer.alt = plan.mapAlt || '';
    mapImageLayer.onerror = () => {
      if (plan.fallbackMapImage && !mapImageLayer.src.endsWith(plan.fallbackMapImage)) {
        mapImageLayer.classList.add('is-fallback');
        mapImageLayer.src = plan.fallbackMapImage;
      } else {
        mapImageLayer.removeAttribute('src');
        mapImageLayer.classList.add('is-fallback');
      }
    };
    mapImageLayer.src = plan.mapImage;
  };

  const renderMapPoints = plan => {
    mapOverlay.innerHTML = '';

    plan.points.forEach(point => {
      const isActive = point.id === activePointId;
      const labelX = Math.min(948, point.x + 28);
      const labelY = Math.max(28, point.y - 16);
      const target = createSvgElement('g', {
        class: `map-target${isActive ? ' is-active' : ''}`,
        tabindex: '0',
        role: 'button',
        'aria-label': `${point.location}：${point.title}`,
      });
      const line = createSvgElement('line', {
        class: 'map-link-line',
        x1: point.x,
        y1: point.y,
        x2: labelX - 8,
        y2: labelY + 4,
      });
      const ring = createSvgElement('circle', {
        class: 'map-target-ring',
        cx: point.x,
        cy: point.y,
        r: 16,
      });
      const marker = createSvgElement('polygon', {
        class: 'map-target-marker',
        points: `${point.x - 12},${point.y - 9} ${point.x + 12},${point.y - 9} ${point.x},${point.y + 12}`,
      });
      const label = createSvgElement('text', {
        class: 'map-target-label',
        x: labelX,
        y: labelY,
      });

      label.textContent = point.location;
      target.append(line, ring, marker, label);
      target.addEventListener('click', () => selectCampaignPoint(point.id));
      target.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          selectCampaignPoint(point.id);
        }
      });
      mapOverlay.appendChild(target);
    });
  };

  const updateOperationBrief = point => {
    window.clearTimeout(campaignBriefTimer);
    operationBrief.classList.add('is-updating');
    const briefX = point.x > 650 ? Math.max(24, point.x - 376) : Math.min(620, point.x + 36);
    const briefY = Math.min(390, Math.max(30, point.y - 44));
    operationBrief.style.setProperty('--brief-x', `${briefX / 10}%`);
    operationBrief.style.setProperty('--brief-y', `${briefY / 5.6}%`);

    campaignBriefTimer = window.setTimeout(() => {
      briefTitle.textContent = point.title;
      briefText.textContent = point.background;
      campaignMapLayout.classList.add('has-brief');
      operationBrief.classList.add('has-content');
      operationBrief.classList.remove('is-updating');
    }, reducedMotion.matches ? 0 : 120);
  };

  const selectCampaignPoint = pointId => {
    const plan = campaignPlans[activeCampaignKey];
    if (!plan) return;

    const point = plan.points.find(item => item.id === pointId);
    if (!point) return;

    activePointId = pointId;
    renderMapPoints(plan);
    updateOperationBrief(point);
  };

  const openCampaignMap = key => {
    const plan = campaignPlans[key];
    if (!plan) return;

    activeCampaignKey = key;
    activePointId = null;
    campaignMapTitle.textContent = plan.title;
    campaignPlanIntro.hidden = true;
    campaignWindowGrid.hidden = true;
    campaignMapView.hidden = false;
    campaignMapView.classList.toggle('is-korea', key === 'korea');
    campaignMapView.classList.add('is-switching');
    campaignMapLayout.classList.remove('has-brief');
    operationBrief.classList.remove('has-content', 'is-updating');
    operationBrief.style.removeProperty('--brief-x');
    operationBrief.style.removeProperty('--brief-y');
    renderMapImage(plan);
    renderMapPoints(plan);

    window.setTimeout(() => {
      campaignMapView.classList.remove('is-switching');
    }, reducedMotion.matches ? 0 : 120);
  };

  const closeCampaignMap = () => {
    activeCampaignKey = null;
    activePointId = null;
    campaignMapView.hidden = true;
    campaignMapView.classList.remove('is-korea');
    campaignPlanIntro.hidden = false;
    campaignWindowGrid.hidden = false;
    campaignMapLayout.classList.remove('has-brief');
    operationBrief.classList.remove('has-content', 'is-updating');
    operationBrief.style.removeProperty('--brief-x');
    operationBrief.style.removeProperty('--brief-y');
  };

  campaignBack.addEventListener('click', closeCampaignMap);
  renderCampaignWindows();
}


const campaignChapters = [
  {
    id: 'korea',
    code: 'CH-01',
    title: '战争阴云',
    summary: '2024年，朝鲜半岛局势骤然紧张，战争爆发在即',
    focus: { lat: 38.3, lon: 126.6 },
    missions: [
      {
        id: 'second-korean-war',
        title: '第二次朝鲜战争',
        location: '三八线北侧',
        lat: 38.3,
        lon: 126.6,
        background: '受平壤请求，中央军委决定对朝展开有限援助。',
      },
    ],
  },
  {
    id: 'darkest',
    code: 'CH-02',
    title: '血肉长城',
    summary: '中央人民广播电台，中央人民广播电台，华北紧急调频389.5，向您播报...',
    focus: { lat: 34.5, lon: 113.5 },
    missions: [
      { id: 'tanggu-blockade', title: '塘沽阻击战', location: '天津塘沽', lat: 39.0, lon: 117.7 },
      { id: 'shanghai-campaign', title: '淞沪会战', location: '上海', lat: 31.2304, lon: 121.4737 },
      { id: 'hong-kong-campaign', title: '香港战役', location: '香港', lat: 22.3193, lon: 114.1694 },
      { id: 'dawang-defense', title: '达旺保卫战', location: '达旺', lat: 27.6, lon: 91.9 },
      { id: 'shandong-blockade', title: '山东阻击战', location: '山东', lat: 36.0671, lon: 120.3826 },
      { id: 'zhangjiakou-counter', title: '张家口反击战', location: '张家口', lat: 40.8, lon: 114.9 },
      { id: 'longbow-war', title: '长弓之战', location: '北京周边', lat: 39.9042, lon: 116.4074 },
    ],
  },
  {
    id: 'flames',
    code: 'CH-03',
    title: '至暗之时',
    summary: '党和人民考验我们的时刻到了，同志们，祝好运，我们烈士陵园见！',
    focus: { lat: 40.8, lon: 117.0 },
    missions: [
      { id: 'tianjin-retreat', title: '天津撤退', location: '天津', lat: 39.3434, lon: 117.3616 },
      { id: 'langfang-blockade', title: '廊坊阻击战', location: '廊坊', lat: 39.5, lon: 116.7 },
      { id: 'manzhouli-reclaim', title: '收复满洲里', location: '满洲里', lat: 49.6, lon: 117.4 },
      { id: 'beichen-blockade', title: '北辰区阻击战', location: '天津北辰', lat: 39.2, lon: 117.1 },
      { id: 'pinggu-campaign', title: '平谷区会战', location: '北京平谷', lat: 40.1, lon: 117.1 },
      { id: 'pingan-street', title: '平安街战役', location: '北京城区', lat: 39.9042, lon: 116.4074 },
      { id: 'sanhe-counter', title: '三河反击战', location: '三河', lat: 39.9, lon: 117.1 },
    ],
  },
  {
    id: 'japan',
    code: 'CH-04',
    title: '烈焰升腾',
    summary: '百年国仇，雪耻今日',
    focus: { lat: 37.0, lon: 132.0 },
    missions: [
      { id: 'beijing-counter-final', title: '北京反击战', location: '北京', lat: 39.9042, lon: 116.4074 },
      { id: 'qingdao-liberation-final', title: '青岛光复', location: '青岛', lat: 36.0671, lon: 120.3826 },
      { id: 'tianjin-counter', title: '天津反攻', location: '天津', lat: 39.3434, lon: 117.3616 },
      { id: 'tanggu-encirclement', title: '塘沽合围', location: '天津塘沽', lat: 39.0, lon: 117.7 },
      { id: 'japan-sinking', title: '东瀛陆沉', location: '京都登陆', lat: 35.0, lon: 135.8 },
      { id: 'los-angeles', title: '洛杉矶', location: '洛杉矶', lat: 34.0522, lon: -118.2437 },
    ],
  },
].map(chapter => ({
  ...chapter,
  missions: chapter.missions.map(mission => ({
    background: `${chapter.summary}。${mission.location}方向作战进入关键阶段，玩家需要组织侦察、压制与机动打击，夺取局部战役主动权。`,
    ...mission,
  })),
}));

const initCampaignGlobe = () => {
  const section = document.querySelector('.campaign-globe-section');
  if (!section) return;

  const stage = section.querySelector('.globe-stage');
  const canvas = section.querySelector('.globe-canvas');
  const fallback = section.querySelector('.globe-fallback');
  const tooltip = section.querySelector('.globe-tooltip');
  const linkOverlay = section.querySelector('.campaign-link-overlay');
  const chapterGrid = section.querySelector('.chapter-card-grid');
  const resetButton = section.querySelector('.chapter-reset');
  const reduce = reducedMotion.matches;
  let activeChapterId = null;
  let selectedMissionId = null;
  let selectedMission = null;
  let activeMissionButton = null;
  let renderer;
  let scene;
  let camera;
  let globeGroup;
  let pointGroup;
  let dotMatrixMaterial;
  let coastMatrixMaterial;
  let dotMatrixPoints;
  let dotPositionAttribute;
  let dotSelectedWeightAttribute;
  let dotMeta = [];
  let activeMarker;
  const missionMarkers = new Map();
  let animationFrame;
  let resizeObserver;
  let dragging = false;
  let hasDragged = false;
  let dragStart = { x: 0, y: 0, rotX: 0, rotY: 0 };
  const targetRotation = { x: 0.2, y: -1.4 };
  let targetZoom = 3.05;
  const autoRotateSpeed = 0.0003;
  let isAutoRotating = !reduce;
  let isBattleFocused = false;
  const earthTexturePath = 'assets/textures/earth-mask.png';
  const globeDotCount = 18000;
  const globeDotSize = 3.0;
  const globeDotBrightness = 2.4;
  const globeDotAlphaBoost = 1.85;
  const globeLandBaseBrightness = 0.95;
  const globeOceanBaseBrightness = 0.55;
  const globeBodyOpacity = 0.16;
  const globeGlowOpacity = 0.05;
  const globeCoastDotSize = 2.8;
  const globeCoastBrightness = 3.0;
  const globeCoastAlpha = 0.92;
  const globeCoastSampleStep = 0.9;
  const battleMarkerSize = 0.018;
  const globeScale = 1;
  const globeOffsetX = 0;

  section.classList.add('globe-mode-peek');

  const setGlobeMode = mode => {
    section.classList.toggle('globe-mode-explore', mode === 'explore');
    section.classList.toggle('globe-mode-peek', mode !== 'explore');
    targetZoom = mode === 'explore' ? 2.72 : selectedMission ? 2.55 : 3.05;
    if (mode === 'peek') {
      targetZoom = 3.05;
      isBattleFocused = false;
      isAutoRotating = !reduce;
      selectedMissionId = null;
      selectedMission = null;
      activeMissionButton = null;
      if (activeMarker) activeMarker.material.opacity = 0;
      if (activeMarker) activeMarker.userData.baseOpacity = 0;
      clearSelectedDot();
      if (dotMatrixMaterial) dotMatrixMaterial.uniforms.hasSelected.value = 0;
      if (coastMatrixMaterial) coastMatrixMaterial.uniforms.hasSelected.value = 0;
      missionMarkers.forEach(marker => {
        marker.material.color.set(0x9dff9f);
        marker.userData.baseOpacity = 0;
        marker.material.opacity = 0;
        marker.visible = false;
        marker.scale.setScalar(1);
      });
      tooltip.hidden = true;
      if (linkOverlay) linkOverlay.innerHTML = '';
    }
    window.setTimeout(resizeGlobe, 650);
  };

  const latLonToVector = (lat, lon, radius = 1) => {
    const latRad = lat * Math.PI / 180;
    const lonRad = lon * Math.PI / 180;

    return new THREE.Vector3(
      radius * Math.cos(latRad) * Math.cos(lonRad),
      radius * Math.sin(latRad),
      -radius * Math.cos(latRad) * Math.sin(lonRad)
    );
  };

  const makeLine = (points, color = 0x9dff9f, opacity = 0.24) => {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity });
    return new THREE.Line(geometry, material);
  };

  const hashPoint = (lat, lon) => {
    const value = Math.sin(lat * 12.9898 + lon * 78.233) * 43758.5453;
    return value - Math.floor(value);
  };

  const sampleEarthMask = (image, lat, lon) => {
    if (!image) return { isLand: hashPoint(lat, lon) > 0.58, brightness: 0.42 };
    const wrappedLon = ((((lon + 180) % 360) + 360) % 360) - 180;
    const clampedLat = Math.max(-89.9, Math.min(89.9, lat));
    const x = Math.floor(((wrappedLon + 180) / 360) * (image.width - 1));
    const y = Math.floor(((90 - clampedLat) / 180) * (image.height - 1));
    const offset = (y * image.width + x) * 4;
    const brightness = image.data[offset] / 255;
    return { isLand: brightness > 0.5, brightness };
  };
  const isCoastPoint = (mask, lat, lon) => {
    if (!mask) return false;

    const current = sampleEarthMask(mask, lat, lon).isLand;
    const offsets = [
      [0.8, 0], [-0.8, 0], [0, 0.8], [0, -0.8],
      [0.6, 0.6], [0.6, -0.6], [-0.6, 0.6], [-0.6, -0.6],
    ];

    return offsets.some(([dLat, dLon]) => sampleEarthMask(mask, lat + dLat, lon + dLon).isLand !== current);
  };

  const createDotMatrixMaterial = ({
    pointSize = globeDotSize,
    brightness = globeDotBrightness,
    alphaBoost = globeDotAlphaBoost,
    minFacing = 0,
  } = {}) => new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      time: { value: 0 },
      pointSize: { value: pointSize },
      brightness: { value: brightness },
      alphaBoost: { value: alphaBoost },
      minFacing: { value: minFacing },
      selectedVector: { value: new THREE.Vector3(0, 0, 0) },
      hasSelected: { value: 0 },
    },
    vertexShader: `
      attribute vec3 color;
      attribute float phase;
      attribute float selectedWeight;
      varying vec3 vColor;
      varying float vAlpha;
      varying float vFacing;
      uniform float time;
      uniform float pointSize;
      uniform float brightness;
      uniform float alphaBoost;
      uniform float minFacing;
      uniform vec3 selectedVector;
      uniform float hasSelected;

      void main() {
        float targetGlow = hasSelected * smoothstep(0.20, 0.0, distance(normalize(position), normalize(selectedVector)));
        targetGlow = max(targetGlow, selectedWeight);
        float flicker = 0.90 + 0.10 * sin(time * 1.15 + phase);
        vec3 worldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
        vec3 worldNormal = normalize((modelMatrix * vec4(normalize(position), 0.0)).xyz);
        vec3 viewDirection = normalize(cameraPosition - worldPosition);
        float facing = dot(worldNormal, viewDirection);
        vFacing = smoothstep(0.02, 0.35, facing);
        vFacing = max(minFacing, vFacing);
        vColor = mix(color, vec3(1.0, 0.72, 0.26), targetGlow);
        vAlpha = min(1.0, max(0.45, flicker * alphaBoost) + targetGlow * 0.65);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = pointSize * (1.0 + targetGlow * 1.7 + selectedWeight * 1.1);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      varying float vAlpha;
      varying float vFacing;
      uniform float brightness;

      void main() {
        vec2 uv = gl_PointCoord - vec2(0.5);
        float dist = length(uv);
        if (dist > 0.5) discard;
        float core = smoothstep(0.5, 0.08, dist);
        float alpha = min(1.0, core * vAlpha) * vFacing;
        if (alpha < 0.035) discard;
        gl_FragColor = vec4(vColor * brightness, alpha);
      }
    `,
  });

  const createDotMatrixGlobe = mask => {
    const positions = [];
    const colors = [];
    const phases = [];
    const selectedWeights = [];
    const generatedDotMeta = [];
    const coastPositions = [];
    const coastColors = [];
    const coastPhases = [];
    const coastSelectedWeights = [];
    const candidateCount = globeDotCount;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    
    for (let index = 0; index < candidateCount; index += 1) {
      const y = 1 - (index / (candidateCount - 1)) * 2;
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = index * goldenAngle;
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      const lat = Math.asin(y) * 180 / Math.PI;
      const lon = Math.atan2(-z, x) * 180 / Math.PI;
      const maskInfo = sampleEarthMask(mask, lat, lon);
      const isCoast = isCoastPoint(mask, lat, lon);
      const hash = hashPoint(lat, lon);
      const keepOcean = hash<0.15;
      if (!maskInfo.isLand && !keepOcean) continue;
      const dotIndex = positions.length / 3;
      positions.push(x * 1.015, y * 1.015, z * 1.015);
      const base = maskInfo.isLand ? globeLandBaseBrightness : globeOceanBaseBrightness;
      const intensity = base + hash * (maskInfo.isLand ? 0.15 : 0.12);
      if (isCoast) {
        colors.push(0.9, 1.0, 0.72);
      } else if (maskInfo.isLand) {
        colors.push(0.58, 1, 0.62);
      } else {
         colors.push(0, 0, 0);
      }
      
      phases.push(hash * Math.PI * 2);
      selectedWeights.push(0);
      generatedDotMeta.push({
        lat,
        lon,
        index: dotIndex,
        isLand: maskInfo.isLand,
        isCoast,
        position: new THREE.Vector3(x * 1.015, y * 1.015, z * 1.015),
      });
    }

    for (let lat = -82; lat <= 82; lat += globeCoastSampleStep) {
      const lonStep = globeCoastSampleStep / Math.max(0.28, Math.cos(Math.abs(lat) * Math.PI / 180));
      for (let lon = -180; lon < 180; lon += lonStep) {
        if (!isCoastPoint(mask, lat, lon)) continue;
        const hash = hashPoint(lat, lon);
        if (hash > 0.78) continue;
        const coastVector = latLonToVector(lat, lon, 1.024);
        coastPositions.push(coastVector.x, coastVector.y, coastVector.z);
        coastColors.push(0.9, 1.0, 0.7);
        coastPhases.push(hash * Math.PI * 2);
        coastSelectedWeights.push(0);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.setAttribute('phase', new THREE.Float32BufferAttribute(phases, 1));
    geometry.setAttribute('selectedWeight', new THREE.Float32BufferAttribute(selectedWeights, 1));
    dotPositionAttribute = geometry.getAttribute('position');
    dotSelectedWeightAttribute = geometry.getAttribute('selectedWeight');
    dotMeta = generatedDotMeta;
    dotMatrixMaterial = createDotMatrixMaterial();
    if (selectedMission) {
      dotMatrixMaterial.uniforms.selectedVector.value.copy(latLonToVector(selectedMission.lat, selectedMission.lon, 1));
      dotMatrixMaterial.uniforms.hasSelected.value = 1;
    }
    dotMatrixPoints = new THREE.Points(geometry, dotMatrixMaterial);
    dotMatrixPoints.renderOrder = 999;
    dotMatrixPoints.frustumCulled = false;
    dotMatrixPoints.userData.dotCount = positions.length / 3;
    dotMatrixPoints.userData.dotMeta = dotMeta;
    globeGroup.add(dotMatrixPoints);
    globeGroup.userData.dotCount = dotMatrixPoints.userData.dotCount;
    if (selectedMission) selectNearestDotForMission(selectedMission);

    const coastGeometry = new THREE.BufferGeometry();
    coastGeometry.setAttribute('position', new THREE.Float32BufferAttribute(coastPositions, 3));
    coastGeometry.setAttribute('color', new THREE.Float32BufferAttribute(coastColors, 3));
    coastGeometry.setAttribute('phase', new THREE.Float32BufferAttribute(coastPhases, 1));
    coastGeometry.setAttribute('selectedWeight', new THREE.Float32BufferAttribute(coastSelectedWeights, 1));
    coastMatrixMaterial = createDotMatrixMaterial({
      pointSize: globeCoastDotSize,
      brightness: globeCoastBrightness,
      alphaBoost: globeCoastAlpha,
      minFacing: 0,
    });
    if (selectedMission) {
      coastMatrixMaterial.uniforms.selectedVector.value.copy(latLonToVector(selectedMission.lat, selectedMission.lon, 1));
      coastMatrixMaterial.uniforms.hasSelected.value = 1;
    }
    const coastPoints = new THREE.Points(coastGeometry, coastMatrixMaterial);
    coastPoints.renderOrder = 1000;
    coastPoints.frustumCulled = false;
    coastPoints.userData.coastDotCount = coastPositions.length / 3;
    globeGroup.add(coastPoints);
    globeGroup.userData.coastDotCount = coastPoints.userData.coastDotCount;
  };

  const loadEarthMask = () => new Promise(resolve => {
    const image = new Image();
    image.onload = () => {
      const maskCanvas = document.createElement('canvas');
      maskCanvas.width = image.naturalWidth;
      maskCanvas.height = image.naturalHeight;
      const context = maskCanvas.getContext('2d', { willReadFrequently: true });
      context.drawImage(image, 0, 0);
      resolve({
        width: maskCanvas.width,
        height: maskCanvas.height,
        data: context.getImageData(0, 0, maskCanvas.width, maskCanvas.height).data,
      });
    };
    image.onerror = () => resolve(null);
    image.src = earthTexturePath;
  });

  const addOrbit = (rotation, opacity) => {
    const curve = new THREE.EllipseCurve(0, 0, 1.32, 1.32, -1.15, 1.15, false, 0);
    const points = curve.getPoints(96).map(point => new THREE.Vector3(point.x, point.y, 0));
    const orbit = makeLine(points, 0x57f0d0, opacity);
    orbit.rotation.set(rotation.x, rotation.y, rotation.z);
    orbit.userData.satellites = [];
    for (let index = 0; index < 5; index += 1) {
      const satellite = new THREE.Mesh(
        new THREE.SphereGeometry(0.006, 10, 10),
        new THREE.MeshBasicMaterial({ color: 0x57f0d0, transparent: true, opacity: 0.08 }),
      );
      satellite.userData.phase = index / 5;
      satellite.userData.speed = 0.00005 + index * 0.000006;
      orbit.add(satellite);
      orbit.userData.satellites.push(satellite);
    }
    globeGroup.add(orbit);
    return orbit;
  };

  const createGlobe = () => {
    if (!window.THREE || !canvas) throw new Error('THREE unavailable');

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, targetZoom);
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.2));
    globeGroup = new THREE.Group();
    pointGroup = new THREE.Group();
    scene.add(globeGroup, pointGroup);
    globeGroup.scale.setScalar(globeScale);
    pointGroup.scale.setScalar(globeScale);
    globeGroup.position.x = globeOffsetX;
    pointGroup.position.x = globeOffsetX;

    const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.995, 96, 96),
  new THREE.MeshBasicMaterial({
    color: 0x0d281b,
    transparent: true,
    opacity: globeBodyOpacity,
    depthWrite: false,
    depthTest: false,
  }),
);
    globeGroup.add(sphere);
    loadEarthMask().then(mask => {
      createDotMatrixGlobe(mask);
    });

    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(1.04, 96, 96),
      new THREE.MeshBasicMaterial({ color: 0x9dff9f, transparent: true, opacity: globeGlowOpacity, side: THREE.BackSide }),
    );
    globeGroup.add(glow);
    const orbits = [
      addOrbit({ x: 0.8, y: 0.2, z: 0.4 }, 0.012),
      addOrbit({ x: -0.45, y: 0.7, z: -0.2 }, 0.01),
    ];
    globeGroup.userData.orbits = orbits;

    campaignChapters.flatMap(ch => ch.missions).forEach(mission => {
      const marker = new THREE.Mesh(
        new THREE.SphereGeometry(battleMarkerSize, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0x9dff9f, transparent: true, opacity: 0.45 }),
      );
      marker.position.copy(latLonToVector(mission.lat, mission.lon, 1.08));
      marker.userData.missionId = mission.id;
      marker.userData.baseOpacity = 0;
      marker.visible = false;
      missionMarkers.set(mission.id, marker);
      pointGroup.add(marker);
    });

    activeMarker = new THREE.Mesh(
      new THREE.SphereGeometry(battleMarkerSize * 2.2, 24, 24),
      new THREE.MeshBasicMaterial({ color: 0xffc76a, transparent: true, opacity: 0 }),
    );
    activeMarker.userData.baseOpacity = 0;
    activeMarker.visible = false;
    pointGroup.add(activeMarker);
  };

  const resizeGlobe = () => {
    if (!renderer || !camera) return;
    const rect = stage.getBoundingClientRect();
    const maxRenderSize = 1600;
    const renderScale = Math.min(1, maxRenderSize / Math.max(rect.width, rect.height));
    renderer.setSize(Math.max(1, rect.width * renderScale), Math.max(1, rect.height * renderScale), false);
    camera.aspect = rect.width / rect.height;
    camera.updateProjectionMatrix();
    updateLinkLine();
  };

  const rotateToLatLon = (lat, lon) => {
    targetRotation.x = THREE.MathUtils.degToRad(lat * 0.72);
    targetRotation.y = THREE.MathUtils.degToRad(-lon - 90);
  };

  const clearSelectedDot = () => {
    if (!dotSelectedWeightAttribute) return;
    for (let index = 0; index < dotSelectedWeightAttribute.count; index += 1) {
      dotSelectedWeightAttribute.setX(index, 0);
    }
    dotSelectedWeightAttribute.needsUpdate = true;
  };

  const findNearestDotByLatLon = (lat, lon) => {
    if (!dotPositionAttribute || !dotMeta.length) return null;
    const targetVector = latLonToVector(lat, lon, 1.015);
    let nearest = null;
    let nearestDistance = Infinity;
    for (let index = 0; index < dotMeta.length; index += 1) {
      const meta = dotMeta[index];
      const distance = meta.position.distanceToSquared(targetVector);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearest = meta;
      }
    }
    return nearest;
  };

  const selectNearestDotForMission = mission => {
    if (!mission || !dotSelectedWeightAttribute || !dotMeta.length) return;
    const nearest = findNearestDotByLatLon(mission.lat, mission.lon);
    if (!nearest) return;
    console.log('battle target', mission.title, mission.lat, mission.lon, nearest.index, nearest.lat, nearest.lon);
    const selectedPosition = nearest.position;
    for (let index = 0; index < dotMeta.length; index += 1) {
      const distance = Math.sqrt(dotMeta[index].position.distanceToSquared(selectedPosition));
      let weight = 0;
      if (dotMeta[index].index === nearest.index) {
        weight = 1;
      } else if (distance < 0.07) {
        weight = Math.max(0.22, 0.65 * (1 - distance / 0.07));
      }
      dotSelectedWeightAttribute.setX(dotMeta[index].index, weight);
    }
    dotSelectedWeightAttribute.needsUpdate = true;
  };

  const getMarkerFacingVisibility = marker => {
    if (!marker || !camera || !globeGroup) return 0;
    const worldPosition = new THREE.Vector3();
    marker.getWorldPosition(worldPosition);
    const globeCenter = new THREE.Vector3();
    globeGroup.getWorldPosition(globeCenter);
    const worldNormal = worldPosition.clone().sub(globeCenter).normalize();
    const viewDirection = camera.position.clone().sub(worldPosition).normalize();
    return THREE.MathUtils.clamp((worldNormal.dot(viewDirection) - 0.02) / 0.33, 0, 1);
  };

  const updateBattleMarkerVisibility = () => {
    missionMarkers.forEach(marker => {
      if (!marker.visible) return;
      const baseOpacity = marker.userData.baseOpacity ?? 0.45;
      marker.material.opacity = baseOpacity * getMarkerFacingVisibility(marker);
    });
    if (activeMarker && activeMarker.visible) {
      const baseOpacity = activeMarker.userData.baseOpacity ?? 0;
      activeMarker.material.opacity = baseOpacity * getMarkerFacingVisibility(activeMarker);
    }
  };

  const focusMission = mission => {
    selectedMission = mission;
    selectedMissionId = mission.id;
    isBattleFocused = true;
    isAutoRotating = false;
    rotateToLatLon(mission.lat, mission.lon);
    targetZoom = 2.55;
    if (activeMarker) {
      activeMarker.position.copy(latLonToVector(mission.lat, mission.lon, 1.1));
      activeMarker.userData.baseOpacity = 0;
      activeMarker.material.opacity = 0;
      activeMarker.visible = false;
    }
    selectNearestDotForMission(mission);
    if (dotMatrixMaterial) {
      dotMatrixMaterial.uniforms.selectedVector.value.copy(latLonToVector(mission.lat, mission.lon, 1));
      dotMatrixMaterial.uniforms.hasSelected.value = 1;
    }
    if (coastMatrixMaterial) {
      coastMatrixMaterial.uniforms.selectedVector.value.copy(latLonToVector(mission.lat, mission.lon, 1));
      coastMatrixMaterial.uniforms.hasSelected.value = 1;
    }
    missionMarkers.forEach((marker, id) => {
      marker.material.color.set(id === mission.id ? 0xffc76a : 0x9dff9f);
      marker.userData.baseOpacity = 0;
      marker.material.opacity = 0;
      marker.visible = false;
      marker.scale.setScalar(id === mission.id ? 1.8 : 1);
    });
    tooltip.hidden = false;
    tooltip.textContent = `${mission.title} / ${mission.location}`;
    renderChapters();
    updateLinkLine();
  };

  const projectMission = mission => {
    if (!mission || !camera || !renderer) return null;
    const vector = latLonToVector(mission.lat, mission.lon, 1.1).clone();
    vector.applyEuler(globeGroup.rotation);
    vector.multiplyScalar(globeScale);
    vector.x += globeOffsetX;
    vector.project(camera);
    const rect = stage.getBoundingClientRect();
    return {
      x: (vector.x * 0.5 + 0.5) * rect.width,
      y: (-vector.y * 0.5 + 0.5) * rect.height,
      visible: vector.z < 1,
    };
  };

  const updateLinkLine = () => {
    if (linkOverlay) linkOverlay.innerHTML = '';
    if (!selectedMission) return;
    const point = projectMission(selectedMission);
    if (!point || !point.visible) return;
    tooltip.style.left = `${point.x}px`;
    tooltip.style.top = `${point.y}px`;
  };

  const animate = () => {
    animationFrame = requestAnimationFrame(animate);
    if (globeGroup && pointGroup) {
      if (isAutoRotating && !isBattleFocused && !dragging) targetRotation.y += autoRotateSpeed;
      if (dotMatrixMaterial) dotMatrixMaterial.uniforms.time.value = performance.now() / 1000;
      if (coastMatrixMaterial) coastMatrixMaterial.uniforms.time.value = performance.now() / 1000;
      globeGroup.rotation.x += (targetRotation.x - globeGroup.rotation.x) * 0.075;
      globeGroup.rotation.y += (targetRotation.y - globeGroup.rotation.y) * 0.075;
      (globeGroup.userData.orbits || []).forEach((orbit, index) => {
        if (!reduce) orbit.rotation.z += 0.00055 + index * 0.00014;
        (orbit.userData.satellites || []).forEach((satellite, satIndex) => {
          const phase = (performance.now() * satellite.userData.speed + satellite.userData.phase) % 1;
          const angle = -1.15 + phase * 2.3;
          satellite.position.set(Math.cos(angle) * 1.32, Math.sin(angle) * 1.32, 0);
          satellite.material.color.set(selectedMission && satIndex === 0 ? 0xffc76a : 0x57f0d0);
          satellite.material.opacity = selectedMission && satIndex === 0 ? 0.16 : 0.08;
        });
      });
      pointGroup.rotation.copy(globeGroup.rotation);
      camera.position.z += (targetZoom - camera.position.z) * 0.08;
      updateBattleMarkerVisibility();
      renderer.render(scene, camera);
      updateLinkLine();
    }
  };

  const renderChapters = () => {
    section.classList.toggle('chapter-expanded', Boolean(activeChapterId));
    chapterGrid.innerHTML = '';

    const visibleChapters = activeChapterId
      ? campaignChapters.filter(chapter => chapter.id === activeChapterId)
      : campaignChapters;
    visibleChapters.forEach(chapter => {
      
      const card = document.createElement('article');
      const chapterButton = document.createElement('button');
      card.className = `chapter-card${chapter.id === activeChapterId ? ' is-active' : ''}${activeChapterId && chapter.id !== activeChapterId ? ' is-inactive' : ''}`;
      chapterButton.className = 'chapter-card-main';
      chapterButton.type = 'button';
      chapterButton.innerHTML = `<small>${chapter.code}</small><b>${chapter.title}</b><span>${chapter.summary}</span>`;
      chapterButton.addEventListener('click', () => {
        activeChapterId = chapter.id;
        selectedMissionId = null;
        selectedMission = null;
        activeMissionButton = null;
        isBattleFocused = false;
        isAutoRotating = !reduce;
        if (activeMarker) activeMarker.material.opacity = 0;
        if (activeMarker) activeMarker.userData.baseOpacity = 0;
        clearSelectedDot();
        if (dotMatrixMaterial) dotMatrixMaterial.uniforms.hasSelected.value = 0;
        if (coastMatrixMaterial) coastMatrixMaterial.uniforms.hasSelected.value = 0;
        missionMarkers.forEach(marker => {
          marker.material.color.set(0x9dff9f);
          marker.userData.baseOpacity = 0;
          marker.material.opacity = 0;
          marker.visible = false;
          marker.scale.setScalar(1);
        });
        tooltip.hidden = true;
        linkOverlay.innerHTML = '';
        rotateToLatLon(chapter.focus.lat, chapter.focus.lon);
        targetZoom = section.classList.contains('globe-mode-explore') ? 2.7 : 2.95;
        resetButton.hidden = false;
        renderChapters();
      });

      const list = document.createElement('div');
      list.className = 'mission-list';
      chapter.missions.forEach(mission => {
        const item = document.createElement('button');
        item.className = `mission-item${mission.id === selectedMissionId ? ' is-selected' : ''}`;
        item.type = 'button';
        item.innerHTML = `<b>${mission.title}</b><span>${mission.location}</span>`;
        item.addEventListener('click', event => {
          event.stopPropagation();
          activeMissionButton = item;
          focusMission(mission);
        });
        if (mission.id === selectedMissionId) {
          activeMissionButton = item;
        }
        list.appendChild(item);
      });
      card.append(chapterButton, list);
      chapterGrid.appendChild(card);
    });
  };

  resetButton.addEventListener('click', () => {
    activeChapterId = null;
    selectedMissionId = null;
    selectedMission = null;
    activeMissionButton = null;
    isBattleFocused = false;
    isAutoRotating = !reduce;
    targetZoom = 3.05;
    if (activeMarker) activeMarker.material.opacity = 0;
    if (activeMarker) activeMarker.userData.baseOpacity = 0;
    clearSelectedDot();
    if (dotMatrixMaterial) dotMatrixMaterial.uniforms.hasSelected.value = 0;
    if (coastMatrixMaterial) coastMatrixMaterial.uniforms.hasSelected.value = 0;
    missionMarkers.forEach(marker => {
      marker.material.color.set(0x9dff9f);
      marker.userData.baseOpacity = 0;
      marker.material.opacity = 0;
      marker.visible = false;
      marker.scale.setScalar(1);
    });
    tooltip.hidden = true;
    linkOverlay.innerHTML = '';
    resetButton.hidden = true;
    renderChapters();
  });

  stage.addEventListener('pointerdown', event => {
    dragging = true;
    hasDragged = false;
    dragStart = { x: event.clientX, y: event.clientY, rotX: targetRotation.x, rotY: targetRotation.y };
    stage.setPointerCapture(event.pointerId);
  });
  stage.addEventListener('pointermove', event => {
    if (!dragging) return;
    if (Math.abs(event.clientX - dragStart.x) + Math.abs(event.clientY - dragStart.y) > 6) hasDragged = true;
    targetRotation.y = dragStart.rotY + (event.clientX - dragStart.x) * 0.006;
    targetRotation.x = Math.max(-1.05, Math.min(1.05, dragStart.rotX + (event.clientY - dragStart.y) * 0.004));
  });
  stage.addEventListener('pointerup', () => { dragging = false; });
  stage.addEventListener('click', event => {
    event.stopPropagation();
    if (hasDragged) return;
    setGlobeMode(section.classList.contains('globe-mode-explore') ? 'peek' : 'explore');
  });
  section.addEventListener('click', event => {
    if (!section.classList.contains('globe-mode-explore') && !isBattleFocused) return;
    if (stage.contains(event.target) || chapterGrid.contains(event.target) || resetButton.contains(event.target)) return;
    setGlobeMode('peek');
  });
  stage.addEventListener('wheel', event => {
    event.preventDefault();
    event.stopPropagation();
    targetZoom = Math.max(2.15, Math.min(4.1, targetZoom + event.deltaY * 0.0015));
  }, { passive: false });

  try {
    createGlobe();
    resizeGlobe();
    animate();
    if ('ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(resizeGlobe);
      resizeObserver.observe(stage);
    }
    window.addEventListener('resize', resizeGlobe);
  } catch (error) {
    fallback.classList.add('is-visible');
  }

  renderChapters();
};

initCampaignGlobe();

const unitsData = {
  china: {
    infantry: [
      {
        name: '摩托化步兵连',
        desc: '基础地面占领与推进单位，适合在道路与城市边缘展开，用于维持前线存在并配合装甲部队推进。',
      },
      {
        name: '合成反坦克排',
        desc: '面向装甲威胁的前沿伏击单位，负责在关键通道建立反坦克杀伤区，迟滞敌方突击节奏。',
      },
      {
        name: '便携防空连',
        desc: '伴随地面部队展开的近程防空节点，用于驱离低空航空器并保护前线集群机动。',
      },
      {
        name: '电子对抗侦察连',
        desc: '负责电磁侦察、信号压制与区域情报支援，是信息战体系中的前沿节点。',
      },
      {
        name: '猎鹰部队',
        desc: '中国顶级特种部队，适合执行渗透、破袭、解救和敌后打击任务。',
      },
    ],
    armor: [
      {
        name: 'Type-100',
        desc: '新一代主战突击平台，用于正面突破、火力压制与装甲矛头推进。',
      },
      {
        name: 'Type-100火力支援车',
        desc: '伴随装甲集群行动的火力支援单位，负责压制坚固目标并清理复杂地形威胁。',
      },
      {
        name: 'Type-99B',
        desc: '重型装甲突击核心，适合在主攻方向承受压力并撕开敌方防线。',
      },
      {
        name: 'Type-99A',
        desc: '成熟可靠的主战坦克平台，用于装甲对抗、要点夺控与防线反击。',
      },
      {
        name: 'ZSL-10侦察车',
        desc: '高速轮式侦察节点，负责前出探测、路线确认与装甲部队态势扩展。',
      },
      {
        name: 'VN-23运兵轮式突击炮',
        desc: '兼具机动运输与直射火力的轮式平台，适合快速插入战场并支援步兵展开。',
      },
      {
        name: 'LD-2000近防炮',
        desc: '野战近程防护节点，用于拦截低空目标、无人机威胁并保护关键后方资产。',
      },
    ],
    aviation: [
      {
        name: 'WZ-21',
        desc: '高隐蔽、高机动的低空突击平台，用于穿插打击装甲目标与暴露敌军防空体系。',
      },
      {
        name: 'WZ-10',
        desc: '专职武装直升机，负责反装甲、近距火力支援与战场低空压制。',
      },
      {
        name: '直-20',
        desc: '通用战术运输平台，用于机降、补给、撤收和快速调整前线兵力。',
      },
      {
        name: '直-8L',
        desc: '重型运输直升机，适合投送重装物资、工程支援与纵深机动保障。',
      },
    ],
    support: [
      {
        name: '陕西SX2306',
        desc: '战役级保障运输平台，用于牵引、补给与工程支援，维持部队持续作战能力。',
      },
    ],
    artillery: [
      {
        name: 'PBP201 60迫',
        desc: '轻型伴随迫击火力，适合快速压制近距离目标并支援步兵小分队推进。',
      },
      {
        name: 'PCL-181 155车载榴弹炮',
        desc: '高机动远程压制火力，擅长快速部署、打击后转移，支撑机动作战节奏。',
      },
      {
        name: 'SH16自行榴弹炮',
        desc: '履带式伴随炮兵平台，用于持续火力覆盖、阵地压制与纵深目标打击。',
      },
      {
        name: 'PHL-191 箱式火箭炮',
        desc: '远程区域压制与纵深打击节点，用于摧毁集结区、指挥节点和后方支援体系。',
      },
      {
        name: 'SR5 卡车火箭炮',
        desc: '灵活部署的轮式火箭炮平台，适合快速火力突袭和多方向战场支援。',
      },
    ],
  },
  usa: {
    infantry: [
      {
        name: '自动步枪连',
        desc: '标准步兵推进与占领单位，适合在城市、林地和道路节点维持战线控制。',
      },
      {
        name: '“陶2B”反坦克连',
        desc: '远程反装甲火力单位，负责封锁装甲通道并迫使敌方突击编队减速展开。',
      },
      {
        name: '毒刺防空连',
        desc: '便携式低空防护单位，用于掩护前沿部队并限制敌方航空兵活动半径。',
      },
      {
        name: 'TEW电子压制小组',
        desc: '小规模电子战节点，执行信号压制、通信干扰与局部战场感知破坏。',
      },
      {
        name: '三角洲部队',
        desc: '高价值目标猎杀单位，适合执行渗透、破袭、解救和敌后打击任务。',
      },
    ],
    armor: [
      {
        name: 'M1A2 SEP V3 Trophy',
        desc: '强化主动防护的重型主战平台，用于突破强防区并吸收反装甲压力。',
      },
      {
        name: 'M1A2 SEP V2 Trophy',
        desc: '现代化主战坦克核心，适合稳固推进、火力压制与装甲阵地对抗。',
      },
      {
        name: 'M1A2 Abrams',
        desc: '重型装甲突击单位，用于主攻方向推进、要点争夺和防线反击。',
      },
      {
        name: 'Stryker M1127 RV侦察车',
        desc: '轮式侦察平台，负责快速前出、目标标定与战场信息回传。',
      },
      {
        name: 'M10 Booker',
        desc: '轻型直射火力平台，适合支援步兵突破、压制据点与快速反应部署。',
      },
      {
        name: 'Stryker M-SHORAD',
        desc: '轮式近程防空单位，用于保护机动部队免受无人机、直升机和低空目标威胁。',
      },
    ],
    aviation: [
      {
        name: 'RAH-66 Comanche',
        desc: '隐蔽侦察与低空突击平台，用于前沿侦搜、精确打击和诱导敌方防空暴露。',
      },
      {
        name: 'AH-64D Longbow',
        desc: '雷达引导武装直升机，适合在复杂环境中搜索装甲目标并组织低空打击。',
      },
      {
        name: 'AH-64E Guardian',
        desc: '网络化攻击直升机平台，强化协同打击、无人系统控制与近距火力支援。',
      },
      {
        name: 'SUH-60 Black Hawk',
        desc: '通用战术运输直升机，用于机降、医疗后送、补给和战场兵力调整。',
      },
      {
        name: 'V-22 Osprey',
        desc: '倾转旋翼快速投送平台，适合跨区域机动、纵深插入和远距离战术转移。',
      },
      {
        name: 'CH-47 Chinook',
        desc: '重型运输直升机，用于大载荷投送、工程保障和战役级空中补给。',
      },
    ],
    support: [
      {
        name: 'HEMTT',
        desc: '重型战术保障车辆，用于弹药、燃料和装备运输，支撑远距离持续作战。',
      },
    ],
    artillery: [
      {
        name: 'M224 60迫',
        desc: '轻型迫击炮火力单元，适合伴随步兵行动并快速压制近距离目标。',
      },
      {
        name: 'M777 155榴弹炮',
        desc: '轻量化远程炮兵系统，适合快速部署、精确压制和远距离火力支援。',
      },
      {
        name: 'M109A7 PIM',
        desc: '自行榴弹炮平台，负责持续火力覆盖、机动作战支援和阵地压制。',
      },
      {
        name: 'M270 MLRS多管火箭炮',
        desc: '多管火箭炮系统，适合大纵深区域压制、后方节点打击和火力封锁。',
      },
    ],
  },
};

const unitTypeCards = Array.from(document.querySelectorAll('.unit-type-card'));
const factionButtons = Array.from(document.querySelectorAll('.faction-toggle button'));
const unitWheel = document.querySelector('.unit-wheel');
const wheelList = document.querySelector('.wheel-list');
const unitIdentity = document.querySelector('.unit-identity');

if (unitWheel && wheelList && unitIdentity) {
  let activeFaction = 'china';
  let activeType = 'infantry';
  let activeUnitIndex = 0;
  let dragStartY = 0;
  let dragDelta = 0;
  let wheelLocked = false;
  let identityTimer;

  const normalizeIndex = index => {
    const units = unitsData[activeFaction][activeType];
    return (index + units.length) % units.length;
  };

  const selectUnit = index => {
    activeUnitIndex = normalizeIndex(index);
    renderUnitWheel();
  };

  const getLoopedDiff = (index, total) => {
    let diff = index - activeUnitIndex;

    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    return diff;
  };

  const getArcPosition = diff => {
    const angle = 180 + diff * 22;
    const radians = angle * (Math.PI / 180);
    const radiusX = 26;
    const radiusY = 48;
    const centerX = 92;
    const centerY = 50;
    const depth = Math.abs(diff);

    return {
      x: centerX + Math.cos(radians) * radiusX,
      y: centerY + Math.sin(radians) * radiusY,
      scale: Math.max(0.58, 1 - depth * 0.13),
      opacity: Math.max(0.12, 1 - depth * 0.28),
      z: 10 - depth,
    };
  };

  const renderUnitWheel = () => {
    const units = unitsData[activeFaction][activeType];
    const currentUnit = units[activeUnitIndex];

    unitWheel.style.setProperty('--track-rotation', `${activeUnitIndex * -8}deg`);
    window.clearTimeout(identityTimer);
    unitIdentity.classList.add('is-updating');
    identityTimer = window.setTimeout(() => {
      unitIdentity.querySelector('h3').textContent = currentUnit.name;
      unitIdentity.querySelector('p').textContent = currentUnit.desc;
      unitIdentity.classList.remove('is-updating');
    }, 120);

    wheelList.innerHTML = '';

    units.forEach((unit, index) => {
      const diff = getLoopedDiff(index, units.length);

      if (Math.abs(diff) > 3) return;

      const position = getArcPosition(diff);

      const item = document.createElement('button');
      item.className = `wheel-item${diff === 0 ? ' is-active' : ''}`;
      item.type = 'button';
      item.textContent = unit.name;
      item.style.setProperty('--x', `${position.x.toFixed(2)}%`);
      item.style.setProperty('--y', `${position.y.toFixed(2)}%`);
      item.style.setProperty('--scale', position.scale.toFixed(2));
      item.style.setProperty('--opacity', position.opacity.toFixed(2));
      item.style.setProperty('--z', String(position.z));
      item.addEventListener('click', () => selectUnit(index));
      wheelList.appendChild(item);
    });
  };

  const setFaction = faction => {
    activeFaction = faction;
    activeUnitIndex = 0;

    factionButtons.forEach(button => {
      button.classList.toggle('is-active', button.dataset.faction === faction);
    });

    renderUnitWheel();
  };

  const setType = type => {
    activeType = type;
    activeUnitIndex = 0;

    unitTypeCards.forEach(card => {
      card.classList.toggle('is-active', card.dataset.type === type);
    });

    renderUnitWheel();
  };

  factionButtons.forEach(button => {
    button.addEventListener('click', () => setFaction(button.dataset.faction));
  });

  unitTypeCards.forEach(card => {
    card.addEventListener('click', () => setType(card.dataset.type));
  });

  unitWheel.addEventListener(
    'wheel',
    event => {
      event.preventDefault();
      event.stopPropagation();

      if (Math.abs(event.deltaY) < 8) return;
      if (wheelLocked) return;

      wheelLocked = true;
      selectUnit(activeUnitIndex + (event.deltaY > 0 ? 1 : -1));
      window.setTimeout(() => {
        wheelLocked = false;
      }, 300);
    },
    { passive: false },
  );

  unitWheel.addEventListener('pointerdown', event => {
    dragStartY = event.clientY;
    dragDelta = 0;
    unitWheel.setPointerCapture?.(event.pointerId);
  });

  unitWheel.addEventListener('pointermove', event => {
    if (!(event.buttons & 1)) return;

    const nextDelta = event.clientY - dragStartY;

    if (Math.abs(nextDelta - dragDelta) < 44) return;

    dragDelta = nextDelta;
    selectUnit(activeUnitIndex + (nextDelta < 0 ? 1 : -1));
    dragStartY = event.clientY;
  });

  renderUnitWheel();
}

const radar = document.querySelector('.radar');

if (radar) {
  const blips = {
    hour: radar.querySelector('.hour-blip'),
    minute: radar.querySelector('.minute-blip'),
    second: radar.querySelector('.second-blip'),
  };

  const updateHoverSignal = event => {
    const rect = radar.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    radar.style.setProperty('--hover-x', `${x.toFixed(2)}%`);
    radar.style.setProperty('--hover-y', `${y.toFixed(2)}%`);
  };

  const setBlipPosition = (blip, angle, radius) => {
    if (!blip) return;

    const radians = angle * (Math.PI / 180);
    const x = 50 + Math.sin(radians) * radius;
    const y = 50 - Math.cos(radians) * radius;

    blip.style.setProperty('--x', `${x.toFixed(2)}%`);
    blip.style.setProperty('--y', `${y.toFixed(2)}%`);
  };

  const updateRadarClock = () => {
    // Uses the user's browser-local time. No external time or timezone API is required.
    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes() + seconds / 60;
    const hours = (now.getHours() % 12) + minutes / 60;

    setBlipPosition(blips.hour, hours * 30, 40);
    setBlipPosition(blips.minute, minutes * 6, 29);
    setBlipPosition(blips.second, seconds * 6, 18);
  };

  updateRadarClock();
  window.setInterval(updateRadarClock, 1000);

  radar.addEventListener('pointerenter', event => {
    updateHoverSignal(event);
    radar.classList.add('is-tracking');
  });

  radar.addEventListener('pointermove', updateHoverSignal);

  radar.addEventListener('pointerleave', () => {
    radar.classList.remove('is-tracking');
  });
}
