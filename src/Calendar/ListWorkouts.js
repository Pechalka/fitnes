import React, {useState, useMemo, Fragment} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {removeWorkout, getWorkouts} from '../redux/main';

import Icon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import 'moment/locale/ru';
moment.locale('ru');

import {Agenda, LocaleConfig} from 'react-native-calendars';

const colors = {
  background: 'red',
  primary: 'yellow',
};

LocaleConfig.locales.ru = {
  monthNames: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ],
  monthNamesShort: [
    'Янв',
    'Фев',
    'Мар',
    'Апр',
    'Май',
    'Июн',
    'Июл',
    'Авг',
    'Сен',
    'Окт',
    'Ноя',
    'Дек',
  ],
  dayNames: [
    'воскресенье',
    'понедельник',
    'вторник',
    'среда',
    'четверг',
    'пятница',
    'суббота',
  ],
  dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  today: 'Сегодня',
};
LocaleConfig.defaultLocale = 'ru';

const ListWorkouts = ({navigation, workouts, ...props}) => {
  const [selectedDay, setSelectedDay] = useState(moment().format('yyyy-MM-DD'));
  //moment().format('yyyy-MM-DD'));

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: moment(selectedDay, 'YYYY-MM-DD').format('MMMM'),
      headerShown: true,
      headerBackVisible: false,
      headerLeft: null,
    });
  }, [navigation, selectedDay]);

  const markedDates = useMemo(() => {
    return Object.keys(workouts).reduce((acc, item) => {
      return {...acc, [item]: {marked: true}};
    }, {});
  }, [workouts]);

  return (
    <View style={{flex: 1, padding: 0, paddingTop: 0}}>
      {/*<WeekLine date={selectedDay}/>*/}
      <Agenda
        scrollEnabled={false}
        // The list of items that have to be displayed in agenda. If you want to render item as empty date
        // the value of date key has to be an empty array []. If there exists no value for date key it is
        // considered that the date in question is not yet loaded
        items={workouts}
        // Callback that gets called when items for a certain month should be loaded (month became visible)
        loadItemsForMonth={(month) => {
          console.log('trigger items loading');
        }}
        // Callback that fires when the calendar is opened or closed
        onCalendarToggled={(calendarOpened) => {
          console.log(calendarOpened);
        }}
        // Callback that gets called on day press
        onDayPress={(day) => {
          console.log('day pressed');
          // alert(JSON.stringify(day));
          setSelectedDay(day.dateString);
        }}
        // Callback that gets called when day changes while scrolling agenda list
        onDayChange={(day) => {
          console.log('day changed');
        }}
        // Initially selected day
        selected={selectedDay}
        renderList={(listProps) => {
          const exercises = workouts[selectedDay];

          if (!exercises || exercises.length === 0) {
            return (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}>
                <Text>нет тренеровки</Text>
              </View>
            );
          }

          const items = exercises.map((data, index) => {
            let icon;

            if (data.exerciseType === 'warm-up') {
              icon = (
                <MaterialCommunityIconsIcon
                  color="#fff"
                  name="fire"
                  size={30}
                />
              );
            }
            if (data.exerciseType === 'main') {
              icon = (
                <MaterialCommunityIconsIcon
                  color="#fff"
                  name="dumbbell"
                  size={30}
                />
              );
            }
            if (data.exerciseType === 'conditions') {
              icon = (
                <MaterialCommunityIconsIcon
                  color="#fff"
                  name="pulse"
                  size={30}
                />
              );
            }

            const isFirst =
              exercises[index].setName !== 'none' &&
              (index == 0 ||
                exercises[index - 1].setName !== exercises[index].setName);
            const isLast =
              exercises[index].setName !== 'none' &&
              (index == exercises.length - 1 ||
                exercises[index + 1].setName !== exercises[index].setName);

            return (
              <Fragment key={data.id}>
                <TouchableOpacity
                  key={data.id}
                  onPress={() =>
                    navigation.navigate('details', {
                      id: data.id,
                      date: selectedDay,
                    })
                  }
                  style={{
                    paddingLeft: 26,
                    paddingRight: 26,
                    // paddingTop: 30,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      borderLeftColor:
                        data.setName !== 'none' ? '#FF7800' : 'transparent',
                      borderLeftWidth: 3,
                      borderRightColor:
                        data.setName !== 'none' ? '#FF7800' : 'transparent',
                      borderRightWidth: 3,
                      // backgroundColor: 'red',
                      // marginTop: 30,
                      alignSelf: 'stretch',

                      ...(isFirst
                        ? {
                            borderTopLeftRadius: 40,
                            borderTopRightRadius: 40,
                            borderTopWidth: 3,
                            borderTopColor: '#FF7800',
                          }
                        : {}),

                      ...(isLast
                        ? {
                            borderBottomLeftRadius: 40,
                            borderBottomRightRadius: 40,
                            borderBottomWidth: 3,
                            borderBottomColor: '#FF7800',
                          }
                        : {}),
                    }}>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        // marginRight: 20,
                        // marginLeft: 20,
                        borderRadius: 22,
                        width: 45,
                        height: 45,
                        borderWidth: 2,
                        borderColor: '#fff',
                        backgroundColor: '#2B2B2B',
                      }}>
                      {icon}
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      paddingLeft: 5,
                      // paddingBottom: 30,
                      marginBottom: isLast ? 0 : 20,
                    }}>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                      }}>
                      <Text style={{fontSize: 15}}>{data.title}</Text>
                    </View>
                    <View
                      style={{
                        // height: 50,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                      }}>
                      {data.exerciseType === 'warm-up' ? (
                        <Text style={{fontSize: 10, color: '#333333'}}>
                          {data.description}
                        </Text>
                      ) : (
                        <Text style={{fontSize: 10, color: '#333333'}}>
                          {data.sets} x{' '}
                          {data.type === 'reps' ? data.reps : data.time}
                        </Text>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    marginLeft: 26,
                    width: 51,
                    borderLeftColor:
                      data.setName !== 'none' && !isLast
                        ? '#FF7800'
                        : 'transparent',
                    borderLeftWidth: 3,
                    borderRightColor:
                      data.setName !== 'none' && !isLast
                        ? '#FF7800'
                        : 'transparent',
                    borderRightWidth: 3,
                    height: 20,
                  }}
                />
              </Fragment>
            );
          });

          return (
            <View style={{flex: 1, backgroundColor: '#F5F5F5'}}>
              <ScrollView
                style={{
                  flex: 1,
                }}>
                <View
                  style={{
                    flex: 1,
                    paddingTop: 30,
                  }}>
                  {items}
                </View>
              </ScrollView>
              <View
                style={{
                  backgroundColor: '#FF7800',
                  borderRadius: 50,
                  width: 50,
                  height: 50,
                  position: 'absolute',
                  right: 20,
                  bottom: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'flex-end',
                  // margin: 20,
                }}>
                <Icon
                  name="caretright"
                  size={30}
                  color="#424242"
                  onPress={() =>
                    navigation.navigate('details', {
                      id: exercises[0].id,
                      date: selectedDay,
                    })
                  }
                />
              </View>
            </View>
          );
        }}
        rowHasChanged={(r1, r2) => {
          return r1.text !== r2.text;
        }}
        // Hide knob button. Default = false
        hideKnob={false}
        // When `true` and `hideKnob` prop is `false`, the knob will always be visible and the user will be able to drag the knob up and close the calendar. Default = false
        showClosingKnob={true}
        // By default, agenda dates are marked if they have at least one item, but you can override this if needed
        markedDates={markedDates}
        // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
        disabledByDefault={true}
        // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly
        onRefresh={() => console.log('refreshing...')}
        // Set this true while waiting for new data from a refresh
        refreshing={false}
        // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView
        refreshControl={null}
        // Agenda theme
        theme={{
          // ...calendarTheme,
          // agendaDayTextColor: 'yellow',
          // agendaDayNumColor: 'green',
          // agendaTodayColor: 'red',
          // agendaKnobColor: 'blue',
          // // backgroundColor: 'red',
          // // calendarBackground: 'red',
          // // backgroundColor: 'yellow',

          // calendarBackground: colors.background, //agenda background
          // agendaKnobColor: colors.primary, // knob color
          // backgroundColor: colors.background, // background color below agenda
          // agendaDayTextColor: colors.primary, // day name
          // agendaDayNumColor: colors.primary, // day number
          // agendaTodayColor: colors.primary, // today in list
          // monthTextColor: colors.primary, // name in calendar
          // textDefaultColor: 'red',
          // todayBackgroundColor: colors.primary,
          // textSectionTitleColor: colors.primary,
          // selectedDayBackgroundColor: colors.primary, // calendar sel date
          // dayTextColor: colors.primary, // calendar day
          // dotColor: 'white', // dots
          // textDisabledColor: 'red',

          // textSectionTitleColor: 'red',
          calendarBackground: '#2B2B2B',
          agendaKnobColor: '#D9D9D9',
          selectedDayBackgroundColor: '#FF7800',
          agendaDayTextColor: '#fff',
          agendaDayNumColor: '#fff',
          dotColor: '#FF7800',
          // agendaTodayColor: '#FF7800',
          monthTextColor: '#D9D9D9',
          agendaTodayColor: 'red',
          // todayBackgroundColor: 'green',
          todayTextColor: '#fff',
        }}
        // Agenda container style
        style={
          {
            // backgroundColor: 'blue',
          }
        }
      />
    </View>
  );
};

export default connect(
  (state) => ({
    workouts: getWorkouts(state),
  }),
  {removeWorkout},
)(ListWorkouts);
