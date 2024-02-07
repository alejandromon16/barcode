import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import { TicketStats } from '@/services/getTicketStatsByUser';

interface TicketStatsTableProps {
  scanByStats?: TicketStats[] | null | [];
  width: number;
}

const TicketScanStatsTable: React.FC<TicketStatsTableProps> = ({ scanByStats = [], width }) => {
  const tableHead = ['Nombre Completo', 'T. Escaneado'];
  const widthArr = [width, width]; // Adjust column widths as needed

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <View>
          <Table borderStyle={{  borderColor: '#e3e3e3', borderBottomWidth: 1 }}>
            <Row data={tableHead} widthArr={widthArr} style={styles.header} textStyle={styles.textHead} />
          </Table>
          <ScrollView style={styles.dataWrapper}>
            <Table borderStyle={{ borderTopWidth: 1, borderColor: '#C1C0B9', }}>
              {scanByStats &&
                scanByStats.map((stats, index) => (
                  <Row
                    key={index + scanByStats.length}
                    data={[stats.user.fullName, stats.ticketCount.toString()]}
                    widthArr={widthArr}
                    style={[styles.row, index % 2 && { backgroundColor: '#F5F5F5' }]}
                    textStyle={styles.text}
                  />
                ))
              }
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

TicketScanStatsTable.defaultProps = {
  scanByStats: []
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff', borderRadius: 20 },
  header: { height: 50, backgroundColor: '#F5F5F5', borderTopLeftRadius: 10, borderTopRightRadius: 10 },
  textHead: { textAlign: 'center', fontWeight: '400' },
  text: { textAlign: 'center', fontWeight: '100' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#FFFFFF', borderBottomLeftRadius: 10, borderBottomRightRadius: 10 },
});

export default TicketScanStatsTable;
