import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Button,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import {removeWorkout, getWorkouts} from '../redux/main';

import Icon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';

import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

const colors = {
  background: 'red',
  primary: 'yellow',
};

const ListWorkouts = ({navigation, workouts, ...props}) => {
  var d = new Date(),
    month = '' + (d.getMonth() + 1 < 10 ? '0' : '') + (d.getMonth() + 1),
    day = '' + (d.getDate() < 10 ? '0' : '') + d.getDate(),
    year = d.getFullYear();

  const [selectedDay, setSelectedDay] = useState(`${year}-${month}-${day}`);

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

  const days = [1, 2, 3, 4, 5, 6, 7];

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
        // Specify how each item should be rendered in agenda
        // renderItem={(item, firstItemInDay) => {
        //   return <Text>renderItem</Text>;
        // }}
        // // Specify how each date should be rendered. day can be undefined if the item is not first in that day
        // renderDay={(day, item) => {
        //   console.log('... ', day, item);
        //   return <Text>renderDay</Text>;
        // }}
        // Specify how empty date content with no items should be rendered
        // renderEmptyDate={() => {
        //   return (
        //     <View style={{backgroundColor: 'green', flex: 1}}>
        //       <Text>нет тренеровки</Text>
        //     </View>
        //   );
        // }}
        // Specify how agenda knob should look like
        // renderKnob={() => {
        //   return <View />;
        // }}
        // Override inner list with a custom implemented component
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

            // if (true) { // TODO: ready
            //   icon = (
            //     <MaterialCommunityIconsIcon
            //       name="checkbox-marked-circle"
            //       size={30}
            //     />
            //   );
            // }
            console.log('>> ');
            console.log(
              'index ',
              index,
              index + 1 < exercises.length
                ? exercises[index + 1].setName
                : -100,
            );

            const isFirst =
              exercises[index].setName !== 'none' &&
              (index == 0 || exercises[index - 1].setName === 'none');
            const isLast =
              exercises[index].setName !== 'none' &&
              (index == exercises.length - 1 ||
                exercises[index + 1].setName === 'none');

            return (
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
                    {/*data.setName !== 'none' ? (
                      <Text
                        style={{
                          fontSize: 20,
                          lineHeight: 20,
                          color: 'red',
                          backgroundColor: '#ccc',
                          width: 20,
                          height: 20,
                          textAlign: 'center',
                          position: 'absolute',
                          bottom: -10,
                          right: -10,
                        }}>
                        {data.setName}
                      </Text>
                    ) : null*/}
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
            );
          });

          return (
            <View style={{flex: 1, backgroundColor: '#F5F5F5'}}>
              <ScrollView style={{flex: 1, paddingTop: 30}}>{items}</ScrollView>
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
        // Specify what should be rendered instead of ActivityIndicator
        // renderEmptyData={() => {
        //   return (
        //     <View
        //       style={{
        //         backgroundColor: 'green',
        //         flex: 1,
        //         alignItems: 'center',
        //         justifyContent: 'center',
        //       }}>
        //       <Text>нет тренеровки</Text>
        //     </View>
        //   );
        // }}
        // Specify your item comparison function for increased performance
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
          agendaTodayColor: '#FF7800',
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
